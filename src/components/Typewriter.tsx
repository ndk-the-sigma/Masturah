import { useEffect, useState } from "react";

interface Props {
  words: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
}

export function Typewriter({ words, className = "", typeSpeed = 90, deleteSpeed = 45, pause = 1400 }: Props) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"type" | "hold" | "delete">("type");

  useEffect(() => {
    const word = words[i % words.length];
    let timer: number;
    if (phase === "type") {
      if (text.length < word.length) {
        timer = window.setTimeout(() => setText(word.slice(0, text.length + 1)), typeSpeed);
      } else {
        timer = window.setTimeout(() => setPhase("delete"), pause);
      }
    } else if (phase === "delete") {
      if (text.length > 0) {
        timer = window.setTimeout(() => setText(word.slice(0, text.length - 1)), deleteSpeed);
      } else {
        setPhase("type");
        setI((v) => v + 1);
      }
    }
    return () => clearTimeout(timer);
  }, [text, phase, i, words, typeSpeed, deleteSpeed, pause]);

  return (
    <span className={className}>
      {text}
      <span className="ml-0.5 inline-block w-[0.55ch] animate-pulse text-accent">▍</span>
    </span>
  );
}
