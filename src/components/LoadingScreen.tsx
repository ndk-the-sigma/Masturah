import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TIPS = [
  "TIP // Chain of custody starts the moment evidence is touched.",
  "INTEL // Phishing remains the #1 initial access vector.",
  "DOCTRINE // Defense in depth: assume one layer will fail.",
  "RECON // Always verify the URL before you trust the page.",
  "OPSEC // Hash before you analyze. Always.",
  "BRIEF // The CIA triad: Confidentiality, Integrity, Availability.",
];

const OBJECTIVES = [
  "decrypting identity.key",
  "linking forensics.suite",
  "syncing evidence vault",
  "calibrating threat matrix",
  "deploying operator profile",
];

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [tipIdx, setTipIdx] = useState(0);
  const [objIdx, setObjIdx] = useState(0);
  const [ready, setReady] = useState(false);
  const [exiting, setExiting] = useState(false);
  const startedRef = useRef(false);

  // Progress animation — slightly stuttered like a real game loader
  useEffect(() => {
    const total = 3200;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const linear = Math.min(1, (t - start) / total);
      // ease-out + tiny stutter for that "loading shard" feel
      const eased = 1 - Math.pow(1 - linear, 2.2);
      const stutter = Math.sin(linear * 30) * 0.005;
      const p = Math.min(1, Math.max(progress, eased + stutter));
      setProgress(p);
      setObjIdx(Math.min(OBJECTIVES.length - 1, Math.floor(p * OBJECTIVES.length)));
      if (linear < 1) raf = requestAnimationFrame(tick);
      else {
        setProgress(1);
        setReady(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Rotating tips
  useEffect(() => {
    const id = setInterval(() => setTipIdx((i) => (i + 1) % TIPS.length), 1800);
    return () => clearInterval(id);
  }, []);

  // Auto-deploy after a beat if user doesn't tap
  useEffect(() => {
    if (!ready) return;
    const id = setTimeout(() => deploy(), 2200);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  const deploy = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    setExiting(true);
    setTimeout(onDone, 650);
  };

  const pct = Math.round(progress * 100);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          onClick={ready ? deploy : undefined}
          className={`fixed inset-0 z-[100] flex flex-col bg-background text-foreground overflow-hidden ${
            ready ? "cursor-pointer" : "cursor-wait"
          }`}
        >
          {/* === Cinematic background === */}
          <div aria-hidden className="absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 20%, hsl(var(--primary) / 0.22), transparent 55%), radial-gradient(ellipse at 80% 90%, hsl(var(--accent) / 0.18), transparent 60%), linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--background)) 100%)",
              }}
            />
            {/* Tactical grid */}
            <div
              className="absolute inset-0 opacity-[0.18]"
              style={{
                backgroundImage:
                  "linear-gradient(hsl(var(--primary) / 0.45) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.45) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
                maskImage:
                  "radial-gradient(ellipse at center, black 30%, transparent 75%)",
              }}
            />
            {/* Slow scan line */}
            <motion.div
              className="absolute inset-x-0 h-[2px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.7), transparent)",
                boxShadow: "0 0 24px hsl(var(--primary) / 0.6)",
              }}
              animate={{ top: ["-2%", "102%"] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }}
            />
            {/* CRT scanlines */}
            <div
              className="absolute inset-0 opacity-20 mix-blend-overlay"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent 0 2px, hsl(var(--foreground) / 0.08) 2px 3px)",
              }}
            />
            {/* Vignette */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 55%, hsl(var(--background)) 100%)",
              }}
            />
          </div>

          {/* === HUD corners === */}
          <Corner className="top-4 left-4" />
          <Corner className="top-4 right-4" rotate={90} />
          <Corner className="bottom-4 right-4" rotate={180} />
          <Corner className="bottom-4 left-4" rotate={270} />

          {/* === Top HUD bar === */}
          <div className="relative z-10 flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8">
            <div className="flex items-center gap-3">
              <motion.div
                className="h-2.5 w-2.5 rounded-full bg-primary"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                style={{ boxShadow: "0 0 12px hsl(var(--primary))" }}
              />
              <p className="text-mono text-[10px] md:text-xs uppercase tracking-[0.32em] text-muted-foreground">
                CYGIRL.OPS // SECURE CHANNEL
              </p>
            </div>
            <p className="hidden sm:block text-mono text-[10px] md:text-xs uppercase tracking-[0.28em] text-muted-foreground">
              SVR · LAGOS-01
            </p>
          </div>

          {/* === Center: Operator card === */}
          <div className="relative z-10 flex-1 flex items-center justify-center px-6">
            <div className="w-full max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-primary mb-3 text-center"
              >
                ◣ OPERATOR DEPLOYING ◢
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center font-bold tracking-tight leading-none text-[clamp(2.4rem,9vw,5.5rem)]"
                style={{
                  textShadow:
                    "0 0 28px hsl(var(--primary) / 0.55), 0 0 64px hsl(var(--primary) / 0.25)",
                }}
              >
                THE CYGIRL
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-3 flex items-center justify-center gap-3 text-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground"
              >
                <span className="h-px w-8 bg-border" />
                <span>CALLSIGN · MASTURAH BABAWALE</span>
                <span className="h-px w-8 bg-border" />
              </motion.div>

              {/* Stat strip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-8 grid grid-cols-3 gap-2 md:gap-4"
              >
                <Stat label="CLASS" value="FORENSICS" />
                <Stat label="RANK" value="ELITE" />
                <Stat label="LOADOUT" value="LAW · CYBER" />
              </motion.div>
            </div>
          </div>

          {/* === Bottom: progress / tips / deploy === */}
          <div className="relative z-10 px-6 md:px-10 pb-7 md:pb-9">
            {/* Tip ticker */}
            <div className="mx-auto mb-4 h-5 max-w-2xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={tipIdx}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-center text-mono text-[10px] md:text-xs uppercase tracking-[0.22em] text-muted-foreground"
                >
                  {TIPS[tipIdx]}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mx-auto max-w-2xl">
              {/* Objective + percent */}
              <div className="flex items-end justify-between mb-2">
                <p className="text-mono text-[10px] md:text-xs uppercase tracking-[0.28em] text-foreground/80">
                  {ready ? "ALL SYSTEMS ONLINE" : `> ${OBJECTIVES[objIdx]}`}
                </p>
                <p
                  className="text-mono text-lg md:text-xl font-bold text-primary tabular-nums"
                  style={{ textShadow: "0 0 14px hsl(var(--primary) / 0.7)" }}
                >
                  {pct.toString().padStart(3, "0")}
                  <span className="text-muted-foreground text-xs ml-0.5">%</span>
                </p>
              </div>

              {/* Segmented bar */}
              <div className="relative h-3 w-full border border-border bg-secondary/50 overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 transition-[width] duration-150 ease-out"
                  style={{
                    width: `${pct}%`,
                    background:
                      "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))",
                    boxShadow:
                      "0 0 14px hsl(var(--primary) / 0.7), inset 0 0 8px hsl(var(--primary) / 0.4)",
                  }}
                />
                {/* segment dividers */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg, transparent 0 calc(5% - 1px), hsl(var(--background)) calc(5% - 1px) 5%)",
                  }}
                />
                {/* leading edge spark */}
                {!ready && (
                  <motion.div
                    className="absolute top-0 bottom-0 w-[2px] bg-foreground"
                    style={{
                      left: `${pct}%`,
                      boxShadow: "0 0 12px hsl(var(--primary))",
                    }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                )}
              </div>

              {/* Deploy prompt / loading text */}
              <div className="mt-6 h-10 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {ready ? (
                    <motion.button
                      key="deploy"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        deploy();
                      }}
                      className="group relative px-6 py-2 border border-primary text-mono text-xs md:text-sm uppercase tracking-[0.4em] text-primary"
                      style={{
                        boxShadow: "0 0 24px hsl(var(--primary) / 0.45)",
                      }}
                    >
                      <motion.span
                        className="absolute inset-0 bg-primary/10"
                        animate={{ opacity: [0.2, 0.6, 0.2] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                      />
                      <span className="relative">▶ TAP TO DEPLOY</span>
                    </motion.button>
                  ) : (
                    <motion.p
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground"
                    >
                      ESTABLISHING SECURE LINK
                      <Dots />
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* === Exit flash === */}
          <AnimatePresence>
            {exiting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.55 }}
                className="absolute inset-0 bg-primary/30 pointer-events-none"
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border bg-background/40 backdrop-blur-sm px-3 py-2 md:px-4 md:py-3 text-center">
      <p className="text-mono text-[9px] md:text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-mono text-xs md:text-sm uppercase tracking-[0.18em] text-foreground">
        {value}
      </p>
    </div>
  );
}

function Corner({ className = "", rotate = 0 }: { className?: string; rotate?: number }) {
  return (
    <div
      aria-hidden
      className={`absolute h-7 w-7 md:h-9 md:w-9 z-10 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <span className="absolute top-0 left-0 h-full w-[2px] bg-primary/80" />
      <span className="absolute top-0 left-0 h-[2px] w-full bg-primary/80" />
    </div>
  );
}

function Dots() {
  return (
    <span className="inline-block w-6 text-left">
      <motion.span
        animate={{ opacity: [0, 1, 1, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, times: [0, 0.25, 0.5, 1] }}
      >
        .
      </motion.span>
      <motion.span
        animate={{ opacity: [0, 0, 1, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, times: [0, 0.25, 0.5, 1] }}
      >
        .
      </motion.span>
      <motion.span
        animate={{ opacity: [0, 0, 0, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, times: [0, 0.25, 0.5, 0.75] }}
      >
        .
      </motion.span>
    </span>
  );
}
