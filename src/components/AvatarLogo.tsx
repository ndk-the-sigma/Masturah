import { useEffect, useRef, useState } from "react";
import avatarPlaceholder from "@/assets/avatar-placeholder.jpg";

const STORAGE_KEY = "cygirl:avatar";

type Size = "sm" | "md" | "lg" | "xl";

const sizeMap: Record<Size, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-20 w-20",
  xl: "h-40 w-40 md:h-48 md:w-48",
};

export function useStoredAvatar() {
  const [src, setSrc] = useState<string>(avatarPlaceholder);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSrc(stored);
    } catch {
      /* ignore */
    }
  }, []);

  const update = (dataUrl: string) => {
    setSrc(dataUrl);
    try {
      localStorage.setItem(STORAGE_KEY, dataUrl);
    } catch {
      /* quota or privacy mode */
    }
  };

  const reset = () => {
    setSrc(avatarPlaceholder);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  return { src, update, reset, isCustom: src !== avatarPlaceholder };
}

interface AvatarLogoProps {
  size?: Size;
  editable?: boolean;
  ring?: boolean;
  className?: string;
}

export function AvatarLogo({ size = "md", editable = false, ring = true, className = "" }: AvatarLogoProps) {
  const { src, update, reset, isCustom } = useStoredAvatar();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    if (file.size > 4 * 1024 * 1024) {
      alert("Please pick an image under 4MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") update(result);
    };
    reader.readAsDataURL(file);
  };

  const dim = sizeMap[size];

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {ring && (
        <span
          aria-hidden
          className="absolute inset-0 -m-[3px] rounded-full bg-[conic-gradient(from_120deg,hsl(var(--primary)),hsl(var(--accent)),hsl(var(--primary)))] opacity-80 blur-[1px]"
        />
      )}
      <div className={`relative ${dim} overflow-hidden rounded-full border border-border bg-card`}>
        <img
          src={src}
          alt="Masturah Babawale (CyGirl)"
          width={512}
          height={512}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        {editable && (
          <>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="absolute inset-0 flex items-end justify-center bg-background/0 text-[10px] uppercase tracking-[0.18em] text-foreground opacity-0 transition-opacity duration-200 hover:bg-background/60 hover:opacity-100"
              aria-label="Upload your photo"
            >
              <span className="mb-2 rounded-md border border-border bg-card px-2 py-1 text-mono">Change</span>
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
                e.target.value = "";
              }}
            />
          </>
        )}
      </div>
      {editable && isCustom && (
        <button
          type="button"
          onClick={reset}
          className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
        >
          reset
        </button>
      )}
    </div>
  );
}
