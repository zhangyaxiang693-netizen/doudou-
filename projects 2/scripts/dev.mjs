import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, "..");
const viteBin = path.join(
  projectDir,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "vite.cmd" : "vite",
);
const envFile = path.join(projectDir, ".env.local");
const children = [];
let shuttingDown = false;

function start(command, args, label) {
  const child = spawn(command, args, {
    cwd: projectDir,
    env: process.env,
    stdio: "inherit",
  });
  children.push(child);
  child.on("exit", (code, signal) => {
    if (shuttingDown) return;
    const reason = signal ? `signal ${signal}` : `code ${code ?? 0}`;
    console.error(`[dev] ${label} exited with ${reason}`);
    shutdown(code || 1);
  });
}

function shutdown(exitCode = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  children.forEach((child) => {
    if (!child.killed) child.kill("SIGTERM");
  });
  process.exitCode = exitCode;
}

const serverArgs = [];
if (existsSync(envFile)) {
  serverArgs.push(`--env-file=${envFile}`);
}
serverArgs.push("server/index.cjs");

start(process.execPath, serverArgs, "Feishu API server");
start(viteBin, ["--host", "127.0.0.1"], "Vite");

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));
