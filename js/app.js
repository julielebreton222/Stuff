(function () {
  "use strict";

  const S = window.STORY;
  const app = document.getElementById("app");
  const KEY = "knight-who-lost-his-heart";

  // ---------- Saved progress (stays on his device only) ----------
  const blank = { done: {}, quests: {}, journal: {}, letters: [] };
  function load() {
    try { return Object.assign({}, blank, JSON.parse(localStorage.getItem(KEY)) || {}); }
    catch (e) { return Object.assign({}, blank); }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* private mode: progress just won't persist */ }
  }
  let state = load();

  // ---------- Helpers ----------
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fill = (s) => esc(s).replace(/\{name\}/g, esc(S.heroName));
  const paras = (s) => fill(s).split(/\n\s*\n/).map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`).join("");
  const el = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const fmtDate = (ms) => new Date(ms).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });

  function unlocked(i) { return i === 0 || !!state.done[S.chapters[i - 1].id]; }

  // ---------- Heart of eight shards ----------
  function heartSVG() {
    const n = S.chapters.length, cx = 100, cy = 92, R = 260;
    const heart = "M100 182 C 40 132, 0 96, 18 50 C 34 12, 84 12, 100 48 C 116 12, 166 12, 182 50 C 200 96, 160 132, 100 182 Z";
    let shards = "", cracks = "";
    for (let i = 0; i < n; i++) {
      const a1 = (-90 + (360 / n) * i) * Math.PI / 180;
      const a2 = (-90 + (360 / n) * (i + 1)) * Math.PI / 180;
      const p1 = `${cx + R * Math.cos(a1)},${cy + R * Math.sin(a1)}`;
      const p2 = `${cx + R * Math.cos(a2)},${cy + R * Math.sin(a2)}`;
      const found = state.done[S.chapters[i].id] ? "found" : "";
      shards += `<polygon class="shard ${found}" points="${cx},${cy} ${p1} ${p2}"/>`;
      // a slightly jagged crack line from the centre outward
      const mx = cx + 40 * Math.cos(a1) + 6 * Math.sin(a1), my = cy + 40 * Math.sin(a1) - 6 * Math.cos(a1);
      cracks += `<polyline class="crack" points="${cx},${cy} ${mx},${my} ${p1}"/>`;
    }
    return `<svg viewBox="0 0 200 190" role="img" aria-label="A heart mended with gold">
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f6d58a"/><stop offset=".5" stop-color="#c9973a"/><stop offset="1" stop-color="#8a5f1c"/>
        </linearGradient>
        <clipPath id="heartClip"><path d="${heart}"/></clipPath>
      </defs>
      <g clip-path="url(#heartClip)">${shards}${cracks}</g>
      <path class="heart-outline" d="${heart}"/>
    </svg>`;
  }

  // ---------- Cover ----------
  function showCover() {
    const found = S.chapters.filter((c) => state.done[c.id]).length;
    const letters = state.letters.slice().sort((a, b) => a.opensAt - b.opensAt);
    const ready = letters.find((l) => l.opensAt <= Date.now());
    const waiting = letters.find((l) => l.opensAt > Date.now());

    const v = el(`<section class="cover">
      <h1>${esc(S.title)}</h1>
      <p class="subtitle">${esc(S.subtitle)}</p>
      <div class="heart-wrap">${heartSVG()}</div>
      <p class="heart-caption">${found === 0 ? "His heart lies in pieces, scattered across the land." :
        found === S.chapters.length ? "His heart is whole again, mended with gold." :
        `${found} of ${S.chapters.length} pieces found.`}</p>
      ${ready ? `<button class="action open-letter">✉ A sealed letter is ready to open</button>` : ""}
      ${!ready && waiting ? `<p class="sealed-note">✉ A sealed letter waits until ${fmtDate(waiting.opensAt)}</p>` : ""}
      <ul class="chapter-list">${S.chapters.map((c, i) => `
        <li><button class="chapter-btn" data-i="${i}" ${unlocked(i) ? "" : "disabled"}>
          <span>${esc(c.title)}</span>
          <span class="mark">${state.done[c.id] ? "✦" : unlocked(i) ? "›" : "🔒"}</span>
        </button></li>`).join("")}
      </ul>
      <div class="cover-actions">
        <button class="ghost-btn sanctuary-btn">☾ A hard night</button>
        <button class="ghost-btn journal-btn">📜 Book of Deeds</button>
      </div>
    </section>`);

    v.querySelectorAll(".chapter-btn").forEach((b) => b.onclick = () => showChapter(+b.dataset.i, 0));
    v.querySelector(".sanctuary-btn").onclick = showSanctuary;
    v.querySelector(".journal-btn").onclick = showJournal;
    if (ready) v.querySelector(".open-letter").onclick = () => showLetter(ready);
    mount(v);
  }

  function mount(node) { app.innerHTML = ""; app.appendChild(node); window.scrollTo(0, 0); }

  // ---------- Chapter / page reader ----------
  function showChapter(ci, pi) {
    const ch = S.chapters[ci];
    const page = ch.pages[pi];
    const last = pi === ch.pages.length - 1;
    const revisit = !!state.done[ch.id];

    const v = el(`<section class="book">
      <div class="book-top">
        <button class="icon-btn home" aria-label="Back to the map">✕</button>
        <span class="chapter-title">${esc(ch.title)}</span>
        <span style="width:40px"></span>
      </div>
      <article class="page"></article>
      <nav class="page-nav">
        <button class="prev" aria-label="Previous page" ${pi === 0 ? "disabled" : ""}>‹</button>
        <div class="dots">${ch.pages.map((_, i) => `<span class="dot ${i === pi ? "on" : ""}"></span>`).join("")}</div>
        <button class="next" aria-label="Next page">›</button>
      </nav>
    </section>`);

    const pageEl = v.querySelector(".page");
    const nextBtn = v.querySelector(".next");
    const next = () => last ? finishChapter(ci) : showChapter(ci, pi + 1);
    const unlockNext = () => { nextBtn.disabled = false; };

    v.querySelector(".home").onclick = showCover;
    v.querySelector(".prev").onclick = () => pi > 0 && showChapter(ci, pi - 1);
    nextBtn.onclick = next;

    const render = PAGES[page.type] || PAGES.text;
    const interactive = page.type !== "text";
    render(pageEl, page, { unlockNext, firstPage: pi === 0 });

    if (interactive && !revisit && !isPageDone(page)) nextBtn.disabled = true;
    if (!interactive) pageEl.onclick = next; // tap anywhere on a story page

    mount(v);
  }

  function isPageDone(page) {
    if (page.type === "quest") return !!state.quests[page.id];
    if (page.type === "reflect") return !!(state.journal[page.id] || "").trim();
    return false;
  }

  function finishChapter(ci) {
    const ch = S.chapters[ci];
    const first = !state.done[ch.id];
    state.done[ch.id] = Date.now();
    save();
    if (!first) return showCover();
    const allDone = S.chapters.every((c) => state.done[c.id]);
    const o = el(`<div class="complete-overlay">
      <div class="heart-wrap">${heartSVG()}</div>
      <h2>${allDone ? "The heart is whole" : "A piece of the heart is found"}</h2>
      <p>${allDone ? "Every piece, mended with gold." : "Rest now, brave knight. The next chapter will wait for you."}</p>
      <button class="action">Return to the map</button>
    </div>`);
    o.querySelector("button").onclick = () => { o.remove(); showCover(); };
    document.body.appendChild(o);
  }

  // ---------- Page renderers ----------
  const PAGES = {
    text(root, page, ctx) {
      root.innerHTML = `<div class="page-text ${ctx.firstPage ? "dropcap" : ""}">${paras(page.text)}</div>
        <div class="tap-hint">tap to turn the page</div>`;
    },

    stone(root, page, ctx) {
      root.innerHTML = `<p class="prompt">${fill(page.text)}</p>
        <input type="text" maxlength="40" placeholder="What weighs on you…" aria-label="What weighs on you">
        <div class="lake-scene">
          <p class="prompt hold-label" style="text-align:center;opacity:.5">Write a word, then press and hold the stone.</p>
          <div class="stone" role="button" aria-label="Hold the stone"></div>
          <div class="hold-ring"><div></div></div>
          <div class="lake"></div>
        </div>`;
      const input = root.querySelector("input"), stone = root.querySelector(".stone"), bar = root.querySelector(".hold-ring div");
      const label = root.querySelector(".hold-label"), lake = root.querySelector(".lake");
      let p = 0, timer = null, thrown = false;
      input.oninput = () => { stone.textContent = input.value; label.style.opacity = input.value ? 1 : .5; };
      const tick = (dir) => () => {
        p = Math.max(0, Math.min(100, p + dir));
        bar.style.width = p + "%";
        stone.style.filter = `brightness(${1 + p / 120}) saturate(${1 - p / 150})`;
        stone.style.transform = `scale(${1 - p / 400})`;
        if (p >= 100) throwIt();
        if (dir < 0 && p === 0) stop();
      };
      const stop = () => { clearInterval(timer); timer = null; };
      const hold = (e) => {
        if (thrown || !input.value.trim()) { input.focus(); return; }
        e.preventDefault(); stop(); stone.classList.add("holding");
        label.textContent = "Keep holding. Feel how heavy it is…";
        timer = setInterval(tick(1), 70); // ~7 seconds
      };
      const release = () => {
        if (thrown || !timer) return;
        stone.classList.remove("holding"); stop();
        label.textContent = "Not yet. Hold it a little longer.";
        timer = setInterval(tick(-2), 70);
      };
      function throwIt() {
        thrown = true; stop(); stone.classList.remove("holding"); stone.classList.add("thrown");
        input.disabled = true;
        label.textContent = "It's lighter now. Let it go.";
        setTimeout(() => {
          for (let i = 0; i < 3; i++) setTimeout(() => lake.appendChild(el(`<span class="ripple"></span>`)), i * 400);
          label.textContent = "The lake keeps it now.";
          ctx.unlockNext();
        }, 1100);
      }
      stone.addEventListener("pointerdown", hold);
      ["pointerup", "pointerleave", "pointercancel"].forEach((ev) => stone.addEventListener(ev, release));
    },

    burn(root, page, ctx) {
      root.innerHTML = `<p class="prompt">${fill(page.text)}</p>
        <textarea placeholder="Dear…" aria-label="Your unsent letter"></textarea>
        <button class="action" disabled>🔥 Give it to the fire</button>
        <p class="done-note" style="font-size:.9rem;opacity:.8">This letter is never saved anywhere.</p>`;
      const ta = root.querySelector("textarea"), btn = root.querySelector(".action");
      ta.oninput = () => { btn.disabled = !ta.value.trim(); };
      btn.onclick = () => {
        const text = ta.value;
        const burning = el(`<div class="burn-text"></div>`);
        [...text].forEach((ch) => {
          const s = document.createElement("span");
          s.textContent = ch === "\n" ? "\n" : ch;
          if (ch === "\n") { burning.appendChild(document.createElement("br")); return; }
          s.style.animationDelay = (Math.random() * 1.8).toFixed(2) + "s";
          burning.appendChild(s);
        });
        ta.replaceWith(burning);
        btn.replaceWith(el(`<div class="fire">🔥</div>`));
        setTimeout(() => {
          burning.replaceWith(el(`<p class="done-note">The words have gone up with the sparks.</p>`));
          ctx.unlockNext();
        }, 4200);
      };
    },

    candle(root, page, ctx) {
      const total = Math.round((page.minutes || 3) * 60);
      const whispers = page.whispers || [];
      root.innerHTML = `<p class="prompt">${fill(page.text)}</p>
        <div class="candle-scene">
          <div class="candle"><div class="glow"></div><div class="flame"></div><div class="wick"></div><div class="wax"></div></div>
          <div class="whisper"></div>
          <div class="timer"></div>
          <button class="action">Light the candle</button>
        </div>`;
      const scene = root.querySelector(".candle-scene"), btn = root.querySelector(".action");
      const whisper = root.querySelector(".whisper"), timerEl = root.querySelector(".timer");
      const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
      btn.onclick = () => {
        scene.classList.add("lit"); btn.remove();
        root.querySelector(".prompt").style.display = "none";
        let left = total, w = 0;
        timerEl.textContent = fmt(left);
        const step = Math.max(8, Math.floor(total / Math.max(1, whispers.length)));
        const show = () => { if (w < whispers.length) { whisper.style.opacity = 0; setTimeout(() => { whisper.textContent = whispers[w++]; whisper.style.opacity = 1; }, 600); } };
        show();
        const t = setInterval(() => {
          if (!document.body.contains(scene)) return clearInterval(t);
          left--; timerEl.textContent = fmt(left);
          if ((total - left) % step === 0) show();
          if (left <= 0) {
            clearInterval(t);
            whisper.textContent = "Well done. You stayed with the light.";
            timerEl.textContent = "";
            ctx.unlockNext();
          }
        }, 1000);
      };
    },

    reflect(root, page, ctx) {
      root.innerHTML = `<p class="prompt">${fill(page.text)}</p>
        <textarea placeholder="${esc(page.placeholder || "")}" aria-label="Your answer"></textarea>
        <button class="action">Write it in the Book of Deeds</button>
        <p class="done-note" hidden>Written. You can read it any time in the Book of Deeds.</p>`;
      const ta = root.querySelector("textarea"), btn = root.querySelector(".action"), note = root.querySelector(".done-note");
      ta.value = state.journal[page.id] || "";
      btn.onclick = () => {
        if (!ta.value.trim()) return ta.focus();
        state.journal[page.id] = ta.value; save();
        note.hidden = false; ctx.unlockNext();
      };
    },

    quest(root, page, ctx) {
      const done = !!state.quests[page.id];
      root.innerHTML = `<div class="page-text"><p>${fill(page.text)}</p></div>
        <div class="quest-scroll"><h3>⚔ Quest</h3><p>${fill(page.task)}</p></div>
        <button class="action" ${done ? "hidden" : ""}>I have done this</button>
        <p class="done-note" ${done ? "" : "hidden"}>✦ Quest complete</p>
        <p class="done-note later" style="font-size:.9rem;opacity:.75">${done ? "" : "No rush. You can come back when it's done."}</p>`;
      root.querySelector(".action").onclick = (e) => {
        state.quests[page.id] = Date.now(); save();
        e.target.hidden = true;
        root.querySelector(".done-note").hidden = false;
        root.querySelector(".later").textContent = "";
        ctx.unlockNext();
      };
    },

    future(root, page, ctx) {
      root.innerHTML = `<p class="prompt">${fill(page.text)}</p>
        <textarea placeholder="Dear future me…" aria-label="Letter to your future self"></textarea>
        <p style="text-align:center;margin:14px 0 0;font-style:italic">Open it in…</p>
        <div class="choices">
          <button class="choice" data-d="30">1 month</button>
          <button class="choice on" data-d="90">3 months</button>
          <button class="choice" data-d="180">6 months</button>
        </div>
        <button class="action" disabled>Seal the letter</button>`;
      const ta = root.querySelector("textarea"), btn = root.querySelector(".action");
      let days = 90;
      root.querySelectorAll(".choice").forEach((c) => c.onclick = () => {
        root.querySelectorAll(".choice").forEach((x) => x.classList.remove("on"));
        c.classList.add("on"); days = +c.dataset.d;
      });
      ta.oninput = () => { btn.disabled = !ta.value.trim(); };
      btn.onclick = () => {
        const opensAt = Date.now() + days * 86400000;
        state.letters.push({ text: ta.value, sealedAt: Date.now(), opensAt });
        save();
        root.innerHTML = `<p class="prompt" style="text-align:center">The letter is folded, and sealed with red wax.</p>
          <div class="seal">K</div>
          <p class="done-note">It will be waiting for you on<br><strong>${fmtDate(opensAt)}</strong>.</p>`;
        ctx.unlockNext();
      };
    },
  };

  // ---------- Opened letter ----------
  function showLetter(letter) {
    const v = el(`<section class="book">
      <div class="book-top"><button class="icon-btn home" aria-label="Back">✕</button><span class="chapter-title">A letter from the past</span><span style="width:40px"></span></div>
      <article class="page">
        <p class="prompt">Written on ${fmtDate(letter.sealedAt)}, by a knight who was hurting and still believed in you.</p>
        <div class="page-text" style="white-space:pre-wrap"></div>
      </article>
    </section>`);
    v.querySelector(".page-text").textContent = letter.text;
    v.querySelector(".home").onclick = showCover;
    letter.opened = true; save();
    mount(v);
  }

  // ---------- Sanctuary (hard night) ----------
  function showSanctuary() {
    const s = S.sanctuary;
    const v = el(`<section class="sanctuary">
      <h2>${esc(s.title)}</h2>
      <p>${fill(s.text)}</p>
      <div class="breath"></div>
      <div class="breath-label">breathe in</div>
      <p style="font-size:.95rem;opacity:.8">${fill(s.footer)}</p>
      <button class="ghost-btn">Return</button>
    </section>`);
    const label = v.querySelector(".breath-label");
    // 4s in, 1s hold, 5s out (matches the 10s CSS animation)
    const cycle = () => {
      if (!document.body.contains(v)) return;
      label.textContent = "breathe in";
      setTimeout(() => { label.textContent = "hold"; }, 4000);
      setTimeout(() => { label.textContent = "breathe out"; }, 5000);
      setTimeout(cycle, 10000);
    };
    cycle();
    v.querySelector("button").onclick = showCover;
    mount(v);
  }

  // ---------- Book of Deeds (his saved reflections) ----------
  function showJournal() {
    const entries = [];
    S.chapters.forEach((c) => c.pages.forEach((p) => {
      if (p.type === "reflect" && state.journal[p.id]) entries.push({ q: p.text, a: state.journal[p.id] });
      if (p.type === "quest" && state.quests[p.id]) entries.push({ q: "⚔ " + p.task, a: "Completed " + fmtDate(state.quests[p.id]) });
    }));
    const v = el(`<section class="journal">
      <div class="book-top"><button class="icon-btn home" aria-label="Back">✕</button><span class="chapter-title">Book of Deeds</span><span style="width:40px"></span></div>
      ${entries.length ? "" : `<p style="font-style:italic;opacity:.8">The pages are still empty. Your deeds will be written here.</p>`}
    </section>`);
    entries.forEach((e) => {
      const d = el(`<div class="entry"><h4></h4><p></p></div>`);
      d.querySelector("h4").textContent = e.q.replace(/\{name\}/g, S.heroName);
      d.querySelector("p").textContent = e.a;
      v.appendChild(d);
    });
    v.querySelector(".home").onclick = showCover;
    mount(v);
  }

  showCover();
})();
