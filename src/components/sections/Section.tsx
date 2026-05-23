import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function SectionHeader({ index, title, kicker }: { index: string; title: string; kicker?: string }) {
  return (
    <header className="mb-12 flex items-end justify-between gap-6 border-b border-border pb-6">
      <div>
        <p className="eyebrow mb-3">
          <span className="text-mono mr-3">{index}</span>
          {kicker}
        </p>
        <h2 className="max-w-2xl">{title}</h2>
      </div>
    </header>
  );
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Section({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} className="container-prose py-24 md:py-32">
      {children}
    </section>
  );
}
