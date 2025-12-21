/* ================= BREAKPOINTS ================= */

const breakpoints = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)"
};

/* ================= UTILITY HANDLER ================= */

function applyUtility(el, cls) {

  /* ---------- BACKGROUND ---------- */
  if (cls.startsWith("bg-")) {
    const color = cls.startsWith("bg-[")
      ? cls.slice(4, -1)
      : cls.slice(3);

    el.style.backgroundColor = color;
  }

  /* ---------- MARGIN / PADDING ---------- */
  const m = cls.match(/^(m|p)(t|b|l|r|x|y)?-\[(.+)\]$/);
  if (!m) return;

  const [, type, dir = "", value] = m;
  const base = type === "m" ? "margin" : "padding";

  const set = prop => el.style[prop] = value;

  if (dir === "") set(base);
  if (dir === "t") set(base + "Top");
  if (dir === "b") set(base + "Bottom");
  if (dir === "l") set(base + "Left");
  if (dir === "r") set(base + "Right");
  if (dir === "x") { set(base + "Left"); set(base + "Right"); }
  if (dir === "y") { set(base + "Top"); set(base + "Bottom"); }
}

/* ================= BASE UTILITIES ================= */

function applyBaseUtilities() {
  document.querySelectorAll("*").forEach(el => {
    [...el.classList].forEach(cls => {
      if (cls.includes(":")) return; // skip responsive here
      applyUtility(el, cls);
    });
  });
}

/* ================= RESPONSIVE ENGINE ================= */

function applyResponsiveUtilities() {
  document.querySelectorAll('[class*=":"]').forEach(el => {

    [...el.classList].forEach(cls => {
      const m = cls.match(/^(sm|md|lg|xl):(.+)$/);
      if (!m) return;

      const [, bp, rule] = m;
      const mq = window.matchMedia(breakpoints[bp]);

      if (mq.matches) {

        /* --- BOOTSTRAP BUTTON VARIANTS --- */
        if (rule.startsWith("btn-outline-")) {
          [...el.classList].forEach(c => {
            if (c.startsWith("btn-outline-")) {
              el.classList.remove(c);
            }
          });
          el.classList.add(rule);
          return;
        }

        /* --- UTILITIES (bg, m, p) --- */
        if (
          rule.startsWith("bg-") ||
          /^(m|p)(t|b|l|r|x|y)?-\[/.test(rule)
        ) {
          applyUtility(el, rule);
          return;
        }

        /* --- NORMAL CLASS --- */
        el.classList.add(rule);

      } else {
        // remove normal class when breakpoint not active
        if (!rule.includes("[") && !rule.startsWith("btn-outline-")) {
          el.classList.remove(rule);
        }
      }
    });

  });
}

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
  applyBaseUtilities();
  applyResponsiveUtilities();
  window.addEventListener("resize", applyResponsiveUtilities);
});
