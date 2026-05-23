import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import { PROFILE } from "@/lib/portfolio-data";
import { Typewriter } from "@/components/Typewriter";
import { AvatarLogo } from "@/components/AvatarLogo";
import { DownloadCV } from "@/components/DownloadCV";

const CodeMatrixScene = lazy(() => import("../CodeMatrixScene").then((m) => ({ default: m.CodeMatrixScene })));

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
      <div className="absolute inset-0">
        <Suspense fallback={<div className="h-full w-full" />}>
          <CodeMatrixScene />
        </Suspense>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background pointer-events-none" aria-hidden />

      <div className="relative z-10 container-prose flex min-h-[100svh] flex-col justify-center py-24">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="eyebrow mb-6"
        >
          <span className="text-primary">●</span> live · session secure
        </motion.p>

        <div className="grid items-center gap-8 md:grid-cols-[auto,1fr]">
          {/* Photo highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="relative shrink-0"
          >
            <div className="absolute -inset-3 rounded-full bg-[conic-gradient(from_90deg,hsl(var(--primary)),hsl(var(--accent)),hsl(var(--primary)))] opacity-60 blur-md animate-pulse" aria-hidden />
            <AvatarLogo size="xl" editable ring />
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.2 }}
              className="font-mono text-sm text-muted-foreground"
            >
              <span className="text-accent">~/</span>
              <span>whoami</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.3 }}
              className="mt-2 max-w-3xl"
            >
              <span className="text-gradient-brand">{PROFILE.name}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.45 }}
              className="mt-3 font-mono text-md text-foreground"
            >
              <span className="text-muted-foreground">call_me(</span>
              <span className="text-accent">"</span>
              <Typewriter words={PROFILE.aliases} className="text-accent" />
              <span className="text-accent">"</span>
              <span className="text-muted-foreground">)</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.6 }}
              className="mt-5 max-w-xl text-base text-muted-foreground"
            >
              {PROFILE.oneLiner}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.75 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                className="inline-flex h-11 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
              >
                View projects
              </a>
              <a
                href="#contact"
                className="inline-flex h-11 items-center rounded-md border border-border bg-card px-5 text-sm font-medium text-foreground transition-colors duration-200 hover:border-primary/60"
              >
                Get in touch
              </a>
              <DownloadCV />

            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease, delay: 1 }}
          className="absolute bottom-8 left-6 right-6 md:left-10 md:right-10 flex items-center justify-between text-mono text-xs text-muted-foreground"
        >
          <span>Remote · Worldwide</span>
          <span aria-hidden>scroll ↓</span>
        </motion.div>
      </div>
    </section>
  );
}
