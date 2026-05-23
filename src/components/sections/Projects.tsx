import { Section, SectionHeader, Reveal } from "./Section";
import { PROJECTS } from "@/lib/portfolio-data";

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeader index="07" kicker="Selected work" title="Projects built from real gaps, not trends." />

      <div className="space-y-6">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.06}>
            <article className="surface lift p-6 md:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-4">
                <div>
                  <p className="text-mono text-xs text-muted-foreground">0{i + 1}</p>
                  <h3 className="mt-1">{p.name}</h3>
                </div>
                <span className="text-mono text-xs text-muted-foreground">{p.status}</span>
              </div>

              <div className="mt-6 grid gap-8 md:grid-cols-3">
                <div className="md:col-span-2 space-y-4">
                  <p className="text-foreground">{p.summary}</p>
                  <div>
                    <p className="eyebrow mb-2">Why it exists</p>
                    <p className="text-sm text-muted-foreground">{p.why}</p>
                  </div>
                  <div>
                    <p className="eyebrow mb-2">Highlights</p>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      {p.highlights.map((h) => (
                        <li key={h} className="pl-4 relative before:absolute before:left-0 before:top-2.5 before:h-px before:w-2 before:bg-border">{h}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <aside className="space-y-5">
                  <div>
                    <p className="eyebrow mb-2">Role</p>
                    <p className="text-sm text-foreground">{p.role}</p>
                  </div>
                  <div>
                    <p className="eyebrow mb-2">Stack</p>
                    <ul className="flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <li key={s} className="text-mono text-[11px] rounded-sm border border-border bg-secondary/60 px-2 py-1 text-muted-foreground">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {p.link && (
                    <a
                      href={p.link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary transition-colors duration-200 ease-out-soft hover:text-primary-glow"
                    >
                      {p.link.label}
                      <span aria-hidden>↗</span>
                    </a>
                  )}
                </aside>
              </div>

              {p.video && (
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="flex items-center justify-between mb-4">
                    <p className="eyebrow">Walkthrough</p>
                    <a
                      href={p.video.watchUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary transition-colors duration-200 ease-out-soft hover:text-primary-glow"
                    >
                      {p.video.label}
                      <span aria-hidden>↗</span>
                    </a>
                  </div>
                  <div className="relative w-full overflow-hidden rounded-lg border border-border bg-black/50 aspect-video">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={p.video.embedUrl}
                      title={`${p.name} walkthrough video`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
