// Decorative homepage media only. No application state or navigation dependencies.
import { EmployeeDialogues } from "./home-dialogues.js";

// Bundle only clips used by the homepage; retain unused source deliveries locally.
const media = import.meta.glob([
  "../首页ui/员工动画/法师-*.webm",
  "../首页ui/员工动画/裁剪-*.webm",
  "../首页ui/员工动画/特工-休息中.webm",
  "../首页ui/员工动画/咖啡区.webm",
  "../首页ui/员工动画/跑步机 *.webm",
  "../首页ui/员工动画/走路/法师-*.webm",
  "../首页ui/员工动画/走路/剪裁*.webm",
], {
  eager: true,
  query: "?url",
  import: "default",
});
const mediaUrl = (name) => media[`../首页ui/员工动画/${name}.webm`];
const SCENE = { width: 4800, height: 2680 };

// Positions and scales are from 素材位置缩放说明.txt, in its 4800 × 2680 canvas.
const EMPLOYEES = [
  {
    id: "wizard", name: "法师", walkingName: "法师",
    desk: [2684.5, 696, 1.268],
    arrival: [2284, 876.5, 0.668], departure: [2265.5, 866, 0.665],
  },
  {
    id: "cutter", name: "裁剪", walkingName: "剪裁",
    desk: [3999, 699, 1.27],
    arrival: [3598.5, 920, 0.665], departure: [3601.4, 908.5, 0.665],
  },
  {
    id: "agent", name: "特工", walkingName: "特工",
    loopAction: "休息中",
    desk: [2673.5, 1987.5, 1.173],
    arrival: [2325, 2134, 0.665], departure: [2313.5, 2149.5, 0.665],
  },
];
const AMBIENT = [
  { id: "coffee", name: "咖啡区", position: [952, 734, 1.238] },
  { id: "treadmill", name: "跑步机 ", position: [892, 1958, 1.07] },
];

const randomBetween = (min, max) => min + Math.random() * (max - min);

function walkingClip(employee, action) {
  // The delivered cutter filenames use both 剪裁 and an omitted hyphen.
  const separator = employee.id === "cutter" && ["左走开始", "左走循环"].includes(action) ? "" : "-";
  return `走路/${employee.walkingName}${separator}${action}`;
}

function employeeSequence(employee, initialAction) {
  const [ax, ay, as] = employee.arrival;
  const [dx, dy, ds] = employee.departure;
  const walking = (action, from, to, scale) => ({
    name: walkingClip(employee, action),
    position: [from[0], from[1], scale],
    to,
    desk: false,
  });
  const atDesk = (action) => {
    const looping = action === "办公" || action === "休息中";
    return {
      name: `${employee.name}-${action}`, position: employee.desk, desk: true,
      repeats: looping ? 1 + Math.floor(Math.random() * (action === "办公" ? 3 : 2)) : 1,
      playbackRate: looping ? randomBetween(0.94, 1.05) : 1,
    };
  };
  // Keep all transitions in order, varying the work/rest loops each cycle.
  // Walking takes the employee away and back without teleporting.
  const clips = [
    walking("右走结束", [ax - 45, ay], [ax, ay], as),
    ...["上桌", "办公", "休息前", "休息中", "休息后", "下桌"].map(atDesk),
    walking("左走开始", [dx, dy], [dx - 90, dy], ds),
    walking("左走循环", [dx - 90, dy], [dx - 470, dy], ds),
    walking("左走结束", [dx - 470, dy], [dx - 560, dy], ds),
    walking("右走开始", [dx - 560, dy], [dx - 470, dy], as),
    walking("右走循环", [dx - 470, dy], [ax - 45, ay], as),
  ];
  const startIndex = Math.max(0, clips.findIndex(
    (clip) => clip.name === `${employee.name}-${initialAction}`,
  ));
  return [...clips.slice(startIndex), ...clips.slice(0, startIndex)];
}

function setClipLoops(video, repeats, signal) {
  let remaining = repeats - 1;
  let lastTime = 0;
  video.loop = remaining > 0;
  if (!video.loop) return () => {};
  const countLoop = () => {
    if (video.currentTime < lastTime && --remaining === 0) video.loop = false;
    lastTime = video.currentTime;
  };
  video.addEventListener("timeupdate", countLoop, { signal });
  return () => video.removeEventListener("timeupdate", countLoop);
}

function placeVideo(video, position, walking) {
  const [x, y, scale] = position;
  const width = (walking ? 1080 : video.videoWidth) * scale;
  const height = (walking ? 1080 : video.videoHeight) * scale;
  Object.assign(video.style, {
    left: `${(x - width / 2) / SCENE.width * 100}%`,
    top: `${(y - height / 2) / SCENE.height * 100}%`,
    width: `${width / SCENE.width * 100}%`,
    height: `${height / SCENE.height * 100}%`,
  });
}

function waitForMedia(video, eventName, signal, timeout = 15000) {
  return new Promise((resolve) => {
    let timer;
    const finish = (success) => {
      window.clearTimeout(timer);
      video.removeEventListener(eventName, successHandler);
      video.removeEventListener("error", failureHandler);
      signal.removeEventListener("abort", failureHandler);
      resolve(success);
    };
    const successHandler = () => finish(true);
    const failureHandler = () => finish(false);
    if (signal.aborted) return finish(false);
    video.addEventListener(eventName, successHandler, { once: true });
    video.addEventListener("error", failureHandler, { once: true });
    signal.addEventListener("abort", failureHandler, { once: true });
    // Playback can remain paused in a background tab without timing out.
    if (timeout) timer = window.setTimeout(failureHandler, timeout);
  });
}

async function loadClip(video, name, signal) {
  const url = mediaUrl(name);
  if (!url || signal.aborted) return false;
  const ready = waitForMedia(video, "loadeddata", signal);
  video.src = url;
  video.load();
  if (!await ready || signal.aborted) return false;
  // Some browsers decode VP9 but omit its alpha plane. Keep the static
  // fallback there instead of displaying an opaque black video rectangle.
  try {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    context.drawImage(video, 0, 0, 1, 1, 0, 0, 1, 1);
    return context.getImageData(0, 0, 1, 1).data[3] === 0;
  } catch {
    return false;
  }
}

function firstFrame(video, signal) {
  if (!video.requestVideoFrameCallback) return Promise.resolve(!signal.aborted);
  return new Promise((resolve) => {
    let handle;
    const finish = (success) => {
      video.cancelVideoFrameCallback(handle);
      signal.removeEventListener("abort", abort);
      resolve(success);
    };
    const abort = () => finish(false);
    if (signal.aborted) return resolve(false);
    signal.addEventListener("abort", abort, { once: true });
    handle = video.requestVideoFrameCallback(() => finish(true));
  });
}

class StudioEmployees extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; position: absolute; inset: 0; pointer-events: none; }
        slot { display: contents; }
        .media { position: absolute; inset: 0; z-index: 0;
          isolation: isolate; pointer-events: none; }
        video { position: absolute; display: block; visibility: hidden;
          object-fit: fill; mix-blend-mode: normal; pointer-events: none; }
        video[data-active] { visibility: visible; }
      </style>
      <slot></slot><div class="media" aria-hidden="true"></div>`;
    this.motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  }

  connectedCallback() {
    this.setAttribute("aria-hidden", "true");
    this.visibilityHandler = () => this.updatePlayback();
    this.preferenceHandler = () => {
      this.stop();
      this.start();
    };
    document.addEventListener("visibilitychange", this.visibilityHandler);
    this.motionPreference.addEventListener("change", this.preferenceHandler);
    // The fallback img is parsed after the custom element's opening tag.
    queueMicrotask(() => { if (this.isConnected) this.start(); });
  }

  disconnectedCallback() {
    document.removeEventListener("visibilitychange", this.visibilityHandler);
    this.motionPreference.removeEventListener("change", this.preferenceHandler);
    this.stop();
  }

  start() {
    if (this.run || this.motionPreference.matches || !this.isConnected) return;
    if (!this.querySelector(".studio-workstations")) return;
    this.run = new AbortController();
    const { signal } = this.run;
    AMBIENT.forEach((item) => this.playAmbient(item, signal));
    const movingEmployees = EMPLOYEES.filter((employee) => !employee.loopAction);
    const workingEmployee = movingEmployees[Math.floor(Math.random() * movingEmployees.length)];
    EMPLOYEES.forEach((employee) => this.playEmployee(
      employee,
      signal,
      employee === workingEmployee ? "办公" : "休息中",
    ));
    this.dialogues = new EmployeeDialogues(this, signal);
  }

  stop() {
    this.run?.abort();
    this.run = null;
    this.dialogues = null;
    this.shadowRoot.querySelectorAll("video").forEach((video) => {
      video.pause();
      video.removeAttribute("src");
      video.load();
      video.remove();
    });
  }

  createVideo(id) {
    const video = document.createElement("video");
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.dataset.employee = id;
    video.style.zIndex = "0";
    video.setAttribute("aria-hidden", "true");
    video.setAttribute("disablepictureinpicture", "");
    this.shadowRoot.querySelector(".media").append(video);
    return video;
  }

  updatePlayback() {
    this.shadowRoot.querySelectorAll("video[data-playing]").forEach((video) => {
      if (document.hidden) video.pause();
      else video.play().catch(() => {});
    });
    this.dialogues?.onVisibilityChange();
  }

  async beginPlayback(video, signal) {
    video.dataset.playing = "";
    const frame = firstFrame(video, signal);
    if (!document.hidden) {
      try { await video.play(); }
      catch { delete video.dataset.playing; return false; }
    }
    return frame;
  }

  async playAmbient(item, signal) {
    const video = this.createVideo(item.id);
    video.loop = true;
    video.style.zIndex = String(item.layer ?? 0);
    if (await loadClip(video, item.name, signal)) {
      placeVideo(video, item.position, false);
      if (await this.beginPlayback(video, signal)) {
        video.dataset.phase = item.name;
        video.dataset.active = "";
        return;
      }
    }
    video.remove();
  }

  trackWalking(video, clip, signal) {
    let handle;
    const draw = () => {
      if (signal.aborted || !video.hasAttribute("data-playing")) return;
      const progress = Math.min(1, video.currentTime / video.duration);
      const [x, y, scale] = clip.position;
      placeVideo(video, [
        x + (clip.to[0] - x) * progress,
        y + (clip.to[1] - y) * progress,
        scale,
      ], true);
      handle = video.requestVideoFrameCallback
        ? video.requestVideoFrameCallback(draw) : requestAnimationFrame(draw);
    };
    draw();
    return () => {
      if (video.cancelVideoFrameCallback) video.cancelVideoFrameCallback(handle);
      else cancelAnimationFrame(handle);
    };
  }

  async playEmployee(employee, signal, initialAction = "办公") {
    if (employee.loopAction) {
      return this.playAmbient({
        id: employee.id,
        name: `${employee.name}-${employee.loopAction}`,
        position: employee.desk,
        layer: 1,
      }, signal);
    }
    let clips = employeeSequence(employee, initialAction);
    const buffers = [this.createVideo(employee.id), this.createVideo(employee.id)];
    let prepared = loadClip(buffers[0], clips[0].name, signal);
    let index = 0;
    while (!signal.aborted) {
      const video = buffers[index % 2];
      const previous = buffers[(index + 1) % 2];
      const clip = clips[index % clips.length];
      if (!await prepared || signal.aborted) break;
      placeVideo(video, clip.position, !clip.desk);
      // Walking employees stay above coffee and workstation video layers.
      // The unmasked original image beneath every video retains baked shadows.
      video.style.zIndex = clip.desk ? "1" : "2";
      if (index === 0) {
        // Start within a moving loop, showing it only after playback begins.
        const seeked = waitForMedia(video, "seeked", signal);
        video.currentTime = randomBetween(0.2, video.duration * 0.45);
        if (!await seeked || signal.aborted) break;
      }
      video.playbackRate = clip.playbackRate ?? 1;
      const ended = waitForMedia(video, "ended", signal, 0);
      if (!await this.beginPlayback(video, signal) || signal.aborted) break;
      const stopCountingLoops = setClipLoops(video, clip.repeats ?? 1, signal);
      video.dataset.active = "";
      video.dataset.phase = clip.name.split("/").at(-1);
      previous.pause();
      delete previous.dataset.active;
      delete previous.dataset.playing;
      const stopTracking = clip.to ? this.trackWalking(video, clip, signal) : () => {};
      // Load just the next clip, using two reusable decoding buffers per actor.
      prepared = loadClip(previous, clips[(index + 1) % clips.length].name, signal);
      const completed = await ended;
      stopCountingLoops();
      stopTracking();
      if (!completed) break;
      index += 1;
      if (index % clips.length === 0) clips = employeeSequence(employee, initialAction);
    }
    if (!signal.aborted) {
      buffers.forEach((video) => {
        video.pause();
        video.removeAttribute("src");
        video.load();
        video.remove();
      });
    }
  }
}

if (!customElements.get("studio-employees")) {
  customElements.define("studio-employees", StudioEmployees);
}
