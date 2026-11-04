-- Only adds temporary export tables/functions. No history record is changed.
BEGIN;
CREATE TABLE IF NOT EXISTS public.export_jobs (
  id uuid PRIMARY KEY,
  owner_id text NOT NULL,
  input_json jsonb NOT NULL,
  input_hash text NOT NULL,
  build_id text NOT NULL,
  filename text NOT NULL,
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','running','ready','failed','cancelled')),
  progress_json jsonb NOT NULL DEFAULT '{}',
  error text,
  lease_token uuid,
  leased_until timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT now() + interval '24 hours'
);
CREATE INDEX IF NOT EXISTS export_jobs_owner_created ON public.export_jobs(owner_id, created_at DESC);
CREATE INDEX IF NOT EXISTS export_jobs_expiry ON public.export_jobs(expires_at);
CREATE TABLE IF NOT EXISTS public.export_job_chunks (
  job_id uuid NOT NULL REFERENCES public.export_jobs(id) ON DELETE CASCADE,
  file_index integer NOT NULL,
  part_index integer NOT NULL CHECK (part_index >= 0),
  data text NOT NULL CHECK (length(data) <= 699052),
  byte_count integer NOT NULL CHECK (byte_count BETWEEN 0 AND 524288),
  PRIMARY KEY(job_id, file_index, part_index)
);
ALTER TABLE public.export_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.export_job_chunks ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.export_jobs, public.export_job_chunks FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.export_jobs, public.export_job_chunks TO service_role;

CREATE OR REPLACE FUNCTION public.cleanup_export_jobs()
RETURNS integer LANGUAGE plpgsql SECURITY INVOKER SET search_path = pg_catalog, public AS $$
DECLARE removed integer;
BEGIN
  DELETE FROM public.export_jobs WHERE id IN (
    SELECT id FROM public.export_jobs WHERE expires_at < now() ORDER BY expires_at LIMIT 100
  );
  GET DIAGNOSTICS removed = ROW_COUNT;
  RETURN removed;
END $$;

CREATE OR REPLACE FUNCTION public.create_export_job(
  p_id uuid, p_owner text, p_input jsonb, p_hash text, p_build text, p_filename text
) RETURNS public.export_jobs LANGUAGE plpgsql SECURITY INVOKER SET search_path = pg_catalog, public AS $$
DECLARE existing public.export_jobs;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtextextended('exports-owner:' || p_owner, 0));
  PERFORM public.cleanup_export_jobs();
  SELECT * INTO existing FROM public.export_jobs WHERE id = p_id;
  IF FOUND THEN
    IF existing.owner_id <> p_owner OR existing.input_hash <> p_hash THEN
      RAISE EXCEPTION 'EXPORT_ID_CONFLICT';
    END IF;
    RETURN existing;
  END IF;
  IF (SELECT count(*) FROM public.export_jobs WHERE owner_id = p_owner AND
      status IN ('pending','running') AND expires_at > now()) >= 2 THEN
    RAISE EXCEPTION 'EXPORT_ACTIVE_LIMIT';
  END IF;
  IF octet_length(p_input::text) > 40 * 1024 * 1024 THEN RAISE EXCEPTION 'EXPORT_INPUT_TOO_LARGE'; END IF;
  INSERT INTO public.export_jobs(id,owner_id,input_json,input_hash,build_id,filename)
    VALUES(p_id,p_owner,p_input,p_hash,p_build,p_filename) RETURNING * INTO existing;
  RETURN existing;
END $$;

-- A database lease limits rendering to one job across all FaaS instances.
CREATE OR REPLACE FUNCTION public.claim_export_job(p_id uuid, p_owner text, p_token uuid)
RETURNS public.export_jobs LANGUAGE plpgsql SECURITY INVOKER SET search_path = pg_catalog, public AS $$
DECLARE claimed public.export_jobs;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtextextended('exports-global-renderer', 0));
  IF EXISTS (SELECT 1 FROM public.export_jobs WHERE status = 'running' AND
      leased_until > now() AND expires_at > now()) THEN RETURN NULL; END IF;
  UPDATE public.export_jobs SET status='running', lease_token=p_token,
    leased_until=now()+interval '90 seconds', updated_at=now(), error=NULL
    WHERE id=p_id AND owner_id=p_owner AND expires_at>now() AND
      status IN ('pending','running') AND (leased_until IS NULL OR leased_until<=now())
    RETURNING * INTO claimed;
  RETURN claimed;
END $$;

CREATE OR REPLACE FUNCTION public.write_export_chunk(
  p_id uuid, p_token uuid, p_file integer, p_part integer, p_data text, p_bytes integer
) RETURNS void LANGUAGE plpgsql SECURITY INVOKER SET search_path = pg_catalog, public AS $$
BEGIN
  PERFORM 1 FROM public.export_jobs WHERE id=p_id AND status='running'
    AND lease_token=p_token AND leased_until>now() AND expires_at>now() FOR SHARE;
  IF NOT FOUND THEN RAISE EXCEPTION 'EXPORT_LEASE_LOST'; END IF;
  INSERT INTO public.export_job_chunks(job_id,file_index,part_index,data,byte_count)
    VALUES(p_id,p_file,p_part,p_data,p_bytes)
    ON CONFLICT(job_id,file_index,part_index) DO UPDATE SET data=EXCLUDED.data, byte_count=EXCLUDED.byte_count;
END $$;

CREATE OR REPLACE FUNCTION public.checkpoint_export_job(
  p_id uuid, p_token uuid, p_progress jsonb, p_status text, p_error text DEFAULT NULL
) RETURNS public.export_jobs LANGUAGE plpgsql SECURITY INVOKER SET search_path = pg_catalog, public AS $$
DECLARE updated public.export_jobs;
BEGIN
  UPDATE public.export_jobs SET progress_json=p_progress,status=p_status,error=p_error,
    lease_token=NULL,leased_until=NULL,updated_at=now()
    WHERE id=p_id AND status='running' AND lease_token=p_token AND leased_until>now()
    RETURNING * INTO updated;
  IF NOT FOUND THEN RAISE EXCEPTION 'EXPORT_LEASE_LOST'; END IF;
  IF p_status='ready' THEN
    DELETE FROM public.export_job_chunks WHERE job_id=p_id
      AND file_index <> (p_progress->'result'->>'fileIndex')::integer;
    -- Output is immutable once ready; release the large input snapshot.
    UPDATE public.export_jobs SET input_json='{}' WHERE id=p_id;
  END IF;
  RETURN updated;
END $$;

REVOKE ALL ON FUNCTION public.cleanup_export_jobs(),
  public.create_export_job(uuid,text,jsonb,text,text,text),
  public.claim_export_job(uuid,text,uuid),
  public.write_export_chunk(uuid,uuid,integer,integer,text,integer),
  public.checkpoint_export_job(uuid,uuid,jsonb,text,text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.cleanup_export_jobs(),
  public.create_export_job(uuid,text,jsonb,text,text,text),
  public.claim_export_job(uuid,text,uuid),
  public.write_export_chunk(uuid,uuid,integer,integer,text,integer),
  public.checkpoint_export_job(uuid,uuid,jsonb,text,text) TO service_role;
COMMIT;

SELECT
  to_regclass('public.export_jobs') IS NOT NULL AS jobs_ready,
  to_regclass('public.export_job_chunks') IS NOT NULL AS chunks_ready,
  to_regprocedure('public.claim_export_job(uuid,text,uuid)') IS NOT NULL AS leases_ready,
  to_regprocedure('public.checkpoint_export_job(uuid,uuid,jsonb,text,text)') IS NOT NULL AS progress_ready;
