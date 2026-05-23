import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SECTIONS } from "@/lib/portfolio-data";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

const RADIUS = 26;
const STROKE = 3;
const SIZE = (RADIUS + STROKE) * 2;
const CIRC = 2 * Math.PI * RADIUS;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function ProgressRingMenu() {
  const progress = useScrollProgress();
  const [mode, setMode] = useState<"ring" | "expanded" | "jump">("ring");
  const pressTimer = useRef<number | null>(null);
  const longPressed = useRef(false);
  const [hintShown, setHintShown] = useState(false);

  // First-visit hint (one-time, dismissed automatically)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("ring-hint-seen")) return;
    const t = window.setTimeout(() => {
      setHintShown(true);
      localStorage.setItem("ring-hint-seen", "1");
      window.setTimeout(() => setHintShown(false), 4500);
    }, 1200);
    return () => window.clearTimeout(t);
  }, []);

  // Close on outside click / escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMode("ring");
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handlePointerDown = () => {
    longPressed.current = false;
    pressTimer.current = window.setTimeout(() => {
      longPressed.current = true;
      setMode("jump");
    }, 450);
  };
  const handlePointerUp = () => {
    if (pressTimer.current) window.clearTimeout(pressTimer.current);
    if (!longPressed.current) {
      setMode((m) => (m === "expanded" ? "ring" : "expanded"));
    }
  };
  const handlePointerLeave = () => {
    if (pressTimer.current) window.clearTimeout(pressTimer.current);
  };

  const dash = CIRC * (1 - progress);
  const pct = Math.round(progress * 100);

  return (
    <>
      {/* Backdrop for jump mode */}
      <AnimatePresence>
        {mode === "jump" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            onClick={() => setMode("ring")}
          />
        )}
      </AnimatePresence>

      {/* Jump panel */}
      <AnimatePresence>
        {mode === "jump" && (
          <motion.nav
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 z-50 w-[min(360px,90vw)] -translate-x-1/2 -translate-y-1/2 surface-elev p-2"
            aria-label="Quick jump"
          >
            <p className="eyebrow px-3 pt-3 pb-2">Quick jump</p>
            <ul className="flex flex-col">
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <button
                    onClick={() => {
                      scrollToId(s.id);
                      setMode("ring");
                    }}
                    className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-secondary"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-mono text-xs text-muted-foreground">{s.index}</span>
                      <span className="text-foreground">{s.label}</span>
                    </span>
                    <span className="text-mono text-xs text-muted-foreground">{i === SECTIONS.length - 1 ? "↘" : "→"}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Ring + radial expansion */}
      <div className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8">
        <div className="relative">
          {/* Expanded radial labels */}
          <AnimatePresence>
            {mode === "expanded" && (
              <motion.ul
                initial="closed"
                animate="open"
                exit="closed"
                className="pointer-events-none absolute bottom-1/2 right-1/2"
                aria-label="Sections"
              >
                {SECTIONS.map((s, i) => {
                  const angle = (-90 - (i * 70) / Math.max(1, SECTIONS.length - 1)) * (Math.PI / 180);
                  const dist = 110;
                  const x = Math.cos(angle) * dist;
                  const y = Math.sin(angle) * dist;
                  return (
                    <motion.li
                      key={s.id}
                      variants={{
                        closed: { opacity: 0, x: 0, y: 0, scale: 0.6 },
                        open: { opacity: 1, x, y, scale: 1 },
                      }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
                      className="absolute"
                      style={{ translate: "50% 50%" }}
                    >
                      <button
                        onClick={() => {
                          scrollToId(s.id);
                          setMode("ring");
                        }}
                        className="pointer-events-auto -translate-x-1/2 -translate-y-1/2 surface-elev px-3 py-1.5 text-mono text-xs lift hover:text-primary"
                      >
                        <span className="text-muted-foreground mr-2">{s.index}</span>
                        {s.label}
                      </button>
                    </motion.li>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>

          {/* First-visit hint */}
          <AnimatePresence>
            {hintShown && mode === "ring" && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 whitespace-nowrap surface-elev px-3 py-2 text-xs text-muted-foreground"
              >
                Tap to expand · long-press to jump
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ring button */}
          <button
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerLeave}
            onContextMenu={(e) => e.preventDefault()}
            aria-label={`Page ${pct}% scrolled. Tap to open navigation, long-press for quick jump.`}
            className="relative grid place-items-center rounded-full surface-elev transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-95"
            style={{ width: SIZE + 12, height: SIZE + 12 }}
          >
            <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="rotate-[-90deg]">
              <circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth={STROKE}
              />
              <circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke="url(#ringGradient)"
                strokeWidth={STROKE}
                strokeLinecap="round"
                strokeDasharray={CIRC}
                strokeDashoffset={dash}
                style={{ transition: "stroke-dashoffset 200ms cubic-bezier(0.22,1,0.36,1)" }}
              />
              <defs>
                <linearGradient id="ringGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute text-mono text-[11px] font-medium text-foreground">{pct}%</span>
          </button>
        </div>
      </div>
    </>
  );
}
