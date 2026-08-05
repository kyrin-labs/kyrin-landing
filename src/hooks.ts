import { useEffect, useState } from "react";

/** IntersectionObserver-based scroll reveal. Returns [ref, visible]. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const [ref, setRef] = useState<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(ref);
    return () => obs.disconnect();
  }, [ref, threshold]);

  return { ref: setRef, visible };
}

/** Typewriter effect that loops through phrases. */
export function useTypewriter(phrases: string[], typeMs = 45, holdMs = 1600) {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[phraseIdx % phrases.length];
    let t: ReturnType<typeof setTimeout>;

    if (!deleting && text === phrase) {
      t = setTimeout(() => setDeleting(true), holdMs);
    } else if (deleting && text === "") {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
    } else {
      t = setTimeout(
        () => setText(phrase.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? typeMs / 2 : typeMs
      );
    }
    return () => clearTimeout(t);
  }, [text, deleting, phraseIdx, phrases, typeMs, holdMs]);

  return text;
}
