import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import {
  FileText,
  Globe,
  History,
  Moon,
  Paperclip,
  SendHorizontal,
  Sun,
  X,
} from "lucide-react";
import { i18n, type Lang } from "./i18n";

type Theme = "light" | "dark";
type Msg = {
  id: number;
  role: "user" | "ai";
  text: string;
  file?: string;
  cite?: string;
  links?: { label: string; url: string }[];
};

let nextMsgId = 1;

const AVATAR = "/kyrin-1000-v2.png";

// Lucide dropped brand icons, so GitHub is provided as an inline SVG.
function GithubIcon({ size = 13 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("kro-theme");
    return saved === "light" || saved === "dark" ? saved : "light";
  });
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("kro-lang");
    return saved === "th" || saved === "en" ? saved : "th";
  });
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [attached, setAttached] = useState<{
    name: string;
    size: string;
  } | null>(null);
  const [thinking, setThinking] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const userTyped = useRef(false);
  const demoCancel = useRef(false);
  const demoCleanup = useRef<(() => void) | null>(null);

  const t = i18n[lang];

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("kro-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem("kro-lang", lang);
  }, [lang]);

  // Auto-resize the textarea with its content.
  useEffect(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }, [input]);

  // Keep the newest message in view.
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, thinking]);

  // One-time demo: type a question, send it, then answer with a typewriter.
  useEffect(() => {
    const f = t.demoFile;
    const q = t.demoQuestion;
    const timers: number[] = [];
    const intervals: number[] = [];
    demoCleanup.current = () => {
      timers.forEach((id) => clearTimeout(id));
      intervals.forEach((id) => clearInterval(id));
    };
    const alive = () => !demoCancel.current;
    const later = (fn: () => void, ms: number) =>
      timers.push(window.setTimeout(fn, ms));
    const every = (fn: () => void, ms: number) => {
      const id = window.setInterval(fn, ms);
      intervals.push(id);
      return id;
    };

    // 1) Type the question into the input.
    const t0 = 700;
    const typeMs = 40;
    for (let i = 1; i <= q.length; i++) {
      later(
        () => {
          if (alive() && !userTyped.current) setInput(q.slice(0, i));
        },
        t0 + i * typeMs,
      );
    }

    // 2) Attach a PDF file in the composer.
    const attachAt = t0 + q.length * typeMs + 250;
    later(() => {
      if (alive()) setAttached({ name: f, size: "1.2 MB" });
    }, attachAt);

    // 3) Send the question together with the attachment.
    const sendAt = attachAt + 900;
    later(() => {
      if (!alive()) return;
      setMessages((m) => [
        ...m,
        { id: nextMsgId++, role: "user", text: q, file: f },
      ]);
      setInput("");
      setAttached(null);
      setThinking(true);
    }, sendAt);

    // 4) First answer: "uploaded into the system" (one message).
    const uploadAt = sendAt + 900;
    later(() => {
      if (!alive()) return;
      setThinking(false);
      setMessages((m) => [
        ...m,
        { id: nextMsgId++, role: "ai", text: t.demoUploading },
      ]);
    }, uploadAt);

    // 5) Second answer: typewriter summary from the file.
    const summaryAt = uploadAt + 1200;
    later(() => {
      if (!alive()) return;
      const msgId = nextMsgId++;
      setMessages((m) => [
        ...m,
        { id: msgId, role: "ai", text: "", cite: f },
      ]);
      const a = t.demoSummary;
      let i = 0;
      let ivId = 0;
      ivId = every(() => {
        i++;
        setMessages((m) =>
          m.map((x) => (x.id === msgId ? { ...x, text: a.slice(0, i) } : x)),
        );
        if (i >= a.length) clearInterval(ivId);
      }, 20);
    }, summaryAt);

    return () => {
      demoCleanup.current?.();
      demoCleanup.current = null;
    };
  }, []);
  // ^ intentionally empty: the demo runs once on mount.

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    userTyped.current = true;
    setInput(e.target.value);
  };

  const handleSend = (e?: FormEvent) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || thinking) return;

    if (demoCleanup.current) {
      demoCancel.current = true;
      demoCleanup.current();
      demoCleanup.current = null;
    }

    setMessages((m) => [
      ...m,
      { id: nextMsgId++, role: "user", text, file: attached?.name },
    ]);
    setAttached(null);
    setInput("");
    setThinking(true);

    // 1) Normalize the message: lowercase + strip punctuation and Thai
    //    politeness particles, so "สวัสดีครับ" → "สวัสดี".
    const normalize = (s: string) =>
      s
        .toLowerCase()
        .replace(
          /[\s.,!?;:'"()[\]{}<>/\\|`~@#$%^&*+=_\-…“”‘’ครับค่ะจ้าเนอะนะจ๊ะคะฮะอ่ะล่ะเหอะเถอะ]+/g,
          " ",
        )
        .replace(/\s+/g, " ")
        .trim();
    const norm = normalize(text);

    // 2) Flexible matcher — a phrase matches when ALL its words appear in
    //    the message, in any order:
    //    - ASCII words match as whole words and tolerate simple
    //      inflections ("test" → "testing", "develop" → "developer").
    //    - Thai words match as substrings.
    const matches = (phrase: string) => {
      const tokens = normalize(phrase).split(" ").filter(Boolean);
      return (
        tokens.length > 0 &&
        tokens.every((tok) =>
          /^\p{ASCII}+$/u.test(tok)
            ? new RegExp(
                `\\b${tok.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}${
                  tok.length >= 4 ? "\\w*" : ""
                }\\b`,
                "u",
              ).test(norm)
            : norm.includes(tok),
        )
      );
    };
    const anyOf = (phrases: string[]) => phrases.some(matches);
    const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    // 3) Category detection (each group needs ALL its terms).
    const matched = t.detectGroups.some((group) => group.every(matches));
    const isGreeting = anyOf(t.greetTriggers);
    const isTest = anyOf(t.testTriggers);
    const isLegacy = anyOf(t.legacyTerms);

    let answer: string;
    let links: { label: string; url: string }[] | undefined;
    if (matched) {
      answer = t.detectAnswer;
      links = [{ label: t.githubLabel, url: "https://github.com/A70III" }];
    } else if (isLegacy) {
      answer = t.legacyAnswer;
      links = [
        { label: t.githubLabel, url: "https://github.com/kyrin-labs" },
        { label: t.legacySiteLabel, url: "https://legacy.kyrin.dev" },
      ];
    } else if (isGreeting) {
      answer = pick(t.greetAnswers);
    } else if (isTest) {
      answer = pick(t.testAnswers);
    } else {
      answer = pick(t.sampleAnswers);
    }
    window.setTimeout(() => {
      setThinking(false);
      const msgId = nextMsgId++;
      setMessages((m) => [
        ...m,
        { id: msgId, role: "ai", text: "", links },
      ]);
      let i = 0;
      const iv = window.setInterval(() => {
        i++;
        setMessages((m) =>
          m.map((x) =>
            x.id === msgId ? { ...x, text: answer.slice(0, i) } : x,
          ),
        );
        if (i >= answer.length) clearInterval(iv);
      }, 20);
    }, 900);
  };

  return (
    <div className="stage">
      <div className="corner-controls">
        <button
          className="chip-btn"
          onClick={() => setLang((l) => (l === "th" ? "en" : "th"))}
          title={t.langLabel}
        >
          {lang === "th" ? "EN" : "TH"}
        </button>
        <button
          className="chip-btn"
          onClick={() => setTheme((th) => (th === "light" ? "dark" : "light"))}
          title={theme === "light" ? t.themeDark : t.themeLight}
        >
          {theme === "light" ? <Moon size={13} /> : <Sun size={13} />}
        </button>
        <a
          className="chip-btn"
          href="https://legacy.kyrin.dev"
          target="_blank"
          rel="noopener noreferrer"
          title={t.legacyBtnLabel}
        >
          <History size={13} />
        </a>
        <a
          className="chip-btn"
          href="https://github.com/kyrin-labs"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
        >
          <GithubIcon size={13} />
        </a>
      </div>

      <div className="stage-inner">
        <h1 className="wordmark">Kyrin</h1>
        <p className="wordmark-sub">{t.tagline}</p>

        <div className="chat">
          <div className="messages" ref={listRef}>
            {messages.map((m, idx) => (
              <div key={m.id} className={`msg ${m.role}`}>
                {m.role === "ai" && (
                  <img className="msg-avatar" src={AVATAR} alt="" />
                )}
                <div className="msg-main">
                  <span className="msg-label">
                    {m.role === "ai" ? "Kyrin" : t.you}
                  </span>
                  {(m.text || m.role === "ai") && (
                    <div className="bubble">
                      {m.text}
                      {m.role === "ai" && idx === messages.length - 1 && (
                        <span className="caret" />
                      )}
                    </div>
                  )}
                  {m.file && (
                    <div className="file-chip">
                      <Paperclip size={12} />
                      <span>{m.file}</span>
                    </div>
                  )}
                  {m.cite && (
                    <div className="file-chip cite">
                      <FileText size={12} />
                      <span>
                        {t.citationLabel}: {m.cite}
                      </span>
                    </div>
                  )}
                  {m.links && m.links.length > 0 && (
                    <div className="link-row">
                      {m.links.map((l) => (
                        <a
                          key={l.url}
                          className="file-chip link"
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Globe size={12} />
                          <span>{l.label}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="msg ai">
                <img className="msg-avatar" src={AVATAR} alt="" />
                <div className="msg-main">
                  <span className="msg-label">Kyrin</span>
                  <div className="bubble typing">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                    <em>{t.thinking}</em>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="composer">
            {attached && (
              <div className="attach-chip">
                <Paperclip size={13} />
                <span className="attach-name">{attached.name}</span>
                <span className="attach-size">{attached.size}</span>
                <button
                  type="button"
                  className="attach-remove"
                  onClick={() => setAttached(null)}
                  aria-label={t.removeFile}
                  title={t.removeFile}
                >
                  <X size={12} />
                </button>
              </div>
            )}
            <form className="chat-input" onSubmit={handleSend}>
              <button
                type="button"
                className="icon-btn"
                title={t.attach}
                aria-label={t.attach}
                onClick={() =>
                  setAttached((a) =>
                    a ? null : { name: t.demoFile, size: "1.2 MB" },
                  )
                }
              >
                <Paperclip size={18} />
              </button>
              <textarea
                ref={taRef}
                rows={1}
                value={input}
                placeholder={t.placeholder}
                onChange={handleInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <button
                type="submit"
                className="send-btn"
                disabled={(!input.trim() && !attached) || thinking}
                aria-label={t.send}
              >
                <SendHorizontal size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
