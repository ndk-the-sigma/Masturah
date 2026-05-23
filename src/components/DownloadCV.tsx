import { useState, useCallback } from "react";
import { Download, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const CV_PATH = "/Masturah_Babawale_CV.pdf";
const CV_FILENAME = "Masturah_Babawale_CV_2026.pdf";

type Variant = "primary" | "ghost";

interface DownloadCVProps {
  variant?: Variant;
  className?: string;
  label?: string;
}

/**
 * DownloadCV
 * Same-origin, no-redirect PDF download with a tactile pressed state.
 * Fetches the bundled file as a Blob then triggers a synthetic <a download>
 * so the browser uses its native download flow (works across Chrome, Safari,
 * Firefox, mobile browsers) without ever leaving the site.
 */
export function DownloadCV({
  variant = "ghost",
  className,
  label = "Download CV",
}: DownloadCVProps) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  const handleDownload = useCallback(
    async (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Let middle-click / cmd-click open the PDF in a new tab natively.
      if (e.metaKey || e.ctrlKey || e.button === 1) return;
      e.preventDefault();
      if (state === "loading") return;

      setState("loading");
      try {
        const res = await fetch(CV_PATH, { cache: "force-cache" });
        if (!res.ok) throw new Error(String(res.status));
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = CV_FILENAME;
        a.rel = "noopener";
        document.body.appendChild(a);
        a.click();
        a.remove();
        // Free memory after the browser has had a moment to start the save.
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        setState("done");
        setTimeout(() => setState("idle"), 1800);
      } catch {
        // Fallback: native anchor download.
        window.location.href = CV_PATH;
        setState("idle");
      }
    },
    [state],
  );

  const base =
    "group relative inline-flex h-11 select-none items-center gap-2 rounded-md px-5 text-sm font-medium " +
    "transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out " +
    "will-change-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  const variants: Record<Variant, string> = {
    primary:
      "bg-primary text-primary-foreground shadow-[0_8px_24px_-12px_hsl(var(--primary)/0.6)] hover:shadow-[0_10px_28px_-10px_hsl(var(--primary)/0.7)]",
    ghost:
      "border border-primary/60 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary",
  };

  return (
    <a
      href={CV_PATH}
      download={CV_FILENAME}
      onClick={handleDownload}
      aria-label="Download Masturah Babawale's CV (PDF)"
      aria-live="polite"
      data-state={state}
      className={cn(base, variants[variant], className)}
    >
      <span className="inline-flex h-4 w-4 items-center justify-center" aria-hidden>
        {state === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : state === "done" ? (
          <Check className="h-4 w-4" />
        ) : (
          <Download className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
        )}
      </span>
      <span>
        {state === "loading" ? "Preparing…" : state === "done" ? "Downloaded" : label}
      </span>
    </a>
  );
}
