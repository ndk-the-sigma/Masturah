import { PROFILE, SECTIONS } from "@/lib/portfolio-data";
import { AvatarLogo } from "./AvatarLogo";

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-background/40 border-b border-border/60">
      <div className="container-prose flex h-16 items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <AvatarLogo size="sm" editable />
          <span className="text-mono text-sm">
            <span className="text-foreground">{PROFILE.alias}</span>
            <span className="text-muted-foreground"> / {PROFILE.name}</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {SECTIONS.slice(1).map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-sm text-muted-foreground transition-colors duration-200 ease-out-soft hover:text-foreground"
            >
              {s.label}
            </a>
          ))}
        </nav>

      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="container-prose flex flex-col gap-2 py-8 md:flex-row md:items-center md:justify-between">
        <p className="text-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} {PROFILE.name} · CyGirl
        </p>
        <p className="text-mono text-xs text-muted-foreground">Built with intent.</p>
      </div>
    </footer>
  );
}
