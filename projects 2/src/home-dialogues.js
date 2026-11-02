const randomBetween = (min, max) => min + Math.random() * (max - min);
const choose = (items) => items[Math.floor(Math.random() * items.length)];
const readingDuration = (text) => Math.min(
  11000, Math.max(8000, 4500 + Array.from(text).length * 260),
);

const FEATURED_CONVERSATIONS = [
  [["wizard", "琳琳催啦，速交"], ["cutter", "来了来了，保存完就交！"]],
  [["cutter", "摸鱼被桐桐抓包了"], ["wizard", "完了，这下真得干活了。"]],
];

const CONVERSATIONS = {
  work: [
    [["wizard", "说好的最后一版，怎么又来了？"], ["cutter", "最后一版，也有续集。"]],
    [["cutter", "这次真就改一个小地方？"], ["wizard", "对，从头到尾那个小地方。"]],
    [["wizard", "文件名已经叫「最终版8」了。"], ["cutter", "别急，「最终版9」在路上。"]],
    [["cutter", "往左挪一点，又往右挪一点。"], ["wizard", "挺好，今天鼠标步数达标了。"]],
  ],
  wizardRest: [
    [["wizard", "我闭会儿眼，改稿改出重影了。"], ["cutter", "歇吧，需求还没闭眼呢。"]],
    [["wizard", "不是我困，是这会太催眠。"], ["cutter", "你先睡，重点我也没听到。"]],
  ],
  cutterRest: [
    [["cutter", "手先歇会儿，撤销键快秃了。"], ["wizard", "怪不得，改半天又回第一版。"]],
    [["cutter", "别催，脑子还在加载。"], ["wizard", "慢点加载，需求也在改呢。"]],
  ],
  bothRest: [
    [["wizard", "歇五分钟，天塌了再叫我。"], ["cutter", "放心，先塌的是截止时间。"]],
    [["cutter", "我现在听见「小改」就困。"], ["wizard", "我听见「很快」就想请假。"]],
  ],
  walking: [
    [["wizard", "接杯水，回来不会又改了吧？"], ["cutter", "不好说，先喝口水压压惊。"]],
    [["cutter", "我去透口气，屏幕快看穿了。"], ["wizard", "回来别带需求，带杯咖啡就行。"]],
  ],
};
const DREAM_TALK = [
  "Zzz…别改了，梦里也改不动了。",
  "都睡着了，怎么还有人问进度……",
  "Zzz…下班了？哦，原来是梦。",
  "梦里都在开会，这觉算加班吧？",
];

const DIALOGUE_STYLE = `
  .studio-dialogue-layer {
    position: absolute; inset: 0; z-index: 0; pointer-events: none;
  }
  .studio-dialogue {
    position: absolute; width: max-content;
    max-width: min(220px, calc(100% - 24px));
    padding: 11px 15px; border: 1px solid rgba(255,255,255,.94);
    border-radius: 15px; background: rgba(255,255,255,.74);
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    color: #595959; font-family: inherit;
    font-size: clamp(10px, .86vw, 13px); font-weight: 400;
    font-synthesis: none; line-height: 1.7; box-sizing: border-box;
    box-shadow: none; pointer-events: none; overflow-wrap: anywhere;
    opacity: 0; visibility: hidden; transform: translate(-50%, 6px);
    transition: opacity 240ms ease-in-out, transform 240ms ease-in-out,
      visibility 0s linear 240ms;
  }
  .studio-dialogue::after {
    content: ""; position: absolute; bottom: -5px;
    left: var(--tail-left, 50%); width: 8px; height: 8px;
    border-right: 1px solid rgba(255,255,255,.94);
    border-bottom: 1px solid rgba(255,255,255,.94);
    background: rgba(255,255,255,.74); transform: translateX(-50%) rotate(45deg);
  }
  .studio-dialogue.is-visible {
    opacity: 1; visibility: visible; transform: translate(-50%, 0);
    transition-delay: 0s;
  }
  @media (max-width: 520px) {
    .studio-dialogue { max-width: min(174px, calc(100% - 24px)); padding: 9px 12px; }
  }
`;

// Decorative local dialogue only; it never dispatches application actions.
export class EmployeeDialogues {
  constructor(host, signal) {
    this.host = host;
    this.signal = signal;
    this.queue = [];
    this.lastConversation = null;
    this.lastFeaturedConversation = null;
    this.lastFeaturedRound = null;
    this.rounds = 0;
    this.nextAt = performance.now() + randomBetween(2500, 4000);
    this.pointerBusy = false;
    this.focusBusy = false;
    this.style = document.createElement("style");
    this.style.textContent = DIALOGUE_STYLE;
    this.layer = document.createElement("div");
    this.layer.className = "studio-dialogue-layer";
    this.layer.setAttribute("aria-hidden", "true");
    this.bubble = document.createElement("div");
    this.bubble.className = "studio-dialogue";
    this.layer.append(this.bubble);
    host.shadowRoot.append(this.style, this.layer);
    const scene = host.closest(".studio-scene");
    const isStation = (target) => Boolean(target?.closest?.(".studio-station"));
    scene?.addEventListener("pointerover", (event) => {
      this.pointerBusy = isStation(event.target);
    }, { signal });
    scene?.addEventListener("pointerout", (event) => {
      this.pointerBusy = isStation(event.relatedTarget);
    }, { signal });
    scene?.addEventListener("focusin", (event) => {
      this.focusBusy = isStation(event.target);
    }, { signal });
    scene?.addEventListener("focusout", (event) => {
      this.focusBusy = isStation(event.relatedTarget);
    }, { signal });
    this.resizeObserver = new ResizeObserver(() => this.measure());
    this.resizeObserver.observe(host);
    this.resizeObserver.observe(this.bubble);
    signal.addEventListener("abort", () => this.stop(), { once: true });
    this.frame = requestAnimationFrame((now) => this.tick(now));
  }

  visibleVideo(id) {
    return this.host.shadowRoot.querySelector(
      `video[data-employee="${id}"][data-active]`,
    );
  }

  activeVideo(id) {
    const video = this.visibleVideo(id);
    return video && !video.paused ? video : null;
  }

  createRound() {
    const wizard = this.activeVideo("wizard");
    const cutter = this.activeVideo("cutter");
    const agent = this.activeVideo("agent");
    // Feature these exchanges across all actor states, with one other round between them.
    if (wizard && cutter && (this.lastFeaturedRound === null
      || this.rounds - this.lastFeaturedRound >= 2)) {
      const round = choose(FEATURED_CONVERSATIONS.filter(
        (item) => item !== this.lastFeaturedConversation,
      ));
      this.lastFeaturedConversation = round;
      this.lastFeaturedRound = this.rounds;
      this.lastConversation = round;
      return [...round];
    }
    if (agent && ((!wizard || !cutter) || (this.rounds > 0 && Math.random() < 0.3))) {
      return [["agent", choose(DREAM_TALK.filter((text) => text !== this.lastDreamTalk))]];
    }
    if (!wizard || !cutter) return [];
    const mood = (video) => {
      const phase = video.dataset.phase || "";
      if (phase.includes("走") || phase.endsWith("下桌")) return "walking";
      return phase.includes("休息") ? "rest" : "work";
    };
    const a = mood(wizard);
    const b = mood(cutter);
    const group = a === "walking" || b === "walking" ? "walking"
      : a === "rest" && b === "rest" ? "bothRest"
      : a === "rest" ? "wizardRest"
      : b === "rest" ? "cutterRest" : "work";
    const candidates = CONVERSATIONS[group].filter((round) => round !== this.lastConversation);
    const round = choose(candidates.length ? candidates : CONVERSATIONS[group]);
    this.lastConversation = round;
    return [...round];
  }

  measure() {
    this.sceneWidth = this.host.clientWidth;
    this.bubbleWidth = this.bubble.offsetWidth;
  }

  position() {
    // The last visible frame remains in place while the next clip starts.
    const video = this.visibleVideo(this.speaker);
    if (!video || !this.sceneWidth || !this.bubbleWidth) return false;
    const x = parseFloat(video.style.left) + parseFloat(video.style.width) / 2;
    const y = parseFloat(video.style.top) + parseFloat(video.style.height) / 2;
    const headX = x / 100 * this.sceneWidth;
    const half = this.bubbleWidth / 2;
    const center = Math.max(half + 8, Math.min(this.sceneWidth - half - 8, headX));
    this.bubble.style.left = `${center / this.sceneWidth * 100}%`;
    this.bubble.style.top = `${Math.max(1, y - 520 / 2680 * 100)}%`;
    this.bubble.style.setProperty("--tail-left", `${Math.max(
      12, Math.min(this.bubbleWidth - 12, headX - center + half),
    )}px`);
    return true;
  }

  hide() {
    this.bubble.classList.remove("is-visible");
    this.speaker = null;
    this.remainingReadingTime = 0;
  }

  onVisibilityChange() {
    this.hide();
    this.queue = [];
    this.nextAt = performance.now() + randomBetween(2500, 4000);
  }

  tick(now) {
    if (this.signal.aborted) return;
    const busy = document.hidden || this.pointerBusy || this.focusBusy;
    if (busy) {
      if (!this.suspended) {
        this.remainingReadingTime = this.speaker ? Math.max(0, this.until - now) : 0;
        this.bubble.classList.remove("is-visible");
      }
      this.suspended = true;
    } else if (this.suspended) {
      this.suspended = false;
      if (this.speaker && this.remainingReadingTime > 0) {
        this.until = now + Math.max(4000, this.remainingReadingTime);
        this.position();
        this.bubble.classList.add("is-visible");
      } else {
        this.hide();
        this.nextAt = now + randomBetween(1500, 2500);
      }
      this.remainingReadingTime = 0;
    } else if (this.speaker) {
      if (now >= this.until) {
        this.hide();
        this.nextAt = now + (this.queue.length
          ? randomBetween(500, 850) : randomBetween(2800, 5000));
      } else this.position();
    } else if (now >= this.nextAt) {
      if (!this.queue.length) {
        this.queue = this.createRound();
        if (this.queue.length) this.rounds += 1;
      }
      const line = this.queue.shift();
      if (line && this.activeVideo(line[0])) {
        this.speaker = line[0];
        this.bubble.textContent = line[1];
        this.bubble.dataset.speaker = line[0];
        if (line[0] === "agent") this.lastDreamTalk = line[1];
        this.measure();
        if (this.position()) {
          this.bubble.classList.add("is-visible");
          this.until = now + readingDuration(line[1]);
        } else this.hide();
      } else this.nextAt = now + 1500;
    }
    this.frame = requestAnimationFrame((time) => this.tick(time));
  }

  stop() {
    cancelAnimationFrame(this.frame);
    this.resizeObserver.disconnect();
    this.style.remove();
    this.layer.remove();
    this.queue = [];
  }
}
