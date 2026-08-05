export type Lang = "th" | "en";

export interface Dict {
  tagline: string;
  placeholder: string;
  thinking: string;
  you: string;
  attach: string;
  send: string;
  demoFile: string;
  demoQuestion: string;
  demoUploading: string;
  demoSummary: string;
  removeFile: string;
  citationLabel: string;
  detectGroups: string[][];
  detectAnswer: string;
  githubLabel: string;
  sampleAnswers: string[];
  greetTriggers: string[];
  greetAnswers: string[];
  testTriggers: string[];
  testAnswers: string[];
  legacyTerms: string[];
  legacyAnswer: string;
  legacySiteLabel: string;
  langLabel: string;
  themeLight: string;
  themeDark: string;
}

// Shared trigger keywords — language-independent, because users type mixed
// Thai/English (e.g. "kyrin package อ่ะ?"). Detection logic lives in App.tsx
// (flexible token matcher: any word order, inflection-tolerant).
const GREET_TRIGGERS = [
  "สวัสดี",
  "หวัดดี",
  "สวัสดีจ้า",
  "ฮัลโหล",
  "ทักทาย",
  "hello",
  "hi",
  "hey",
  "yo",
  "good morning",
  "good afternoon",
  "good evening",
  "howdy",
];

const TEST_TRIGGERS = [
  "ทดสอบ",
  "เทส",
  "test",
  "testing",
  "ลองระบบ",
  "ลองใช้งาน",
  "check",
  "ping",
  "run a test",
];

const LEGACY_TRIGGERS = [
  "kyrin เดิม",
  "kyrin เก่า",
  "kyrin รุ่นเก่า",
  "kyrin version เก่า",
  "kyrin เวอร์ชันเก่า",
  "kyrin v1",
  "original kyrin",
  "old kyrin",
  "kyrin framework",
  "framework kyrin",
  "kyrin npm",
  "npm kyrin",
  "npm package kyrin",
  "kyrin package",
  "package kyrin",
  "แพ็กเกจ kyrin",
  "kyrin แพ็กเกจ",
  "ไลบรารี kyrin",
  "library kyrin",
  "legacy kyrin",
  "kyrin legacy",
  "legacy.kyrin.dev",
];

export const i18n: Record<Lang, Dict> = {
  th: {
    tagline: "Research OS",
    placeholder: "พิมพ์คำถามอะไรก็ได้…",
    thinking: "กำลังคิด…",
    you: "คุณ",
    attach: "แนบไฟล์",
    send: "ส่ง",
    demoFile: "kyrin-paper.pdf",
    demoQuestion: "ช่วยสรุปไฟล์นี้ให้หน่อย",
    demoUploading: "อัปโหลดไฟล์ kyrin-paper.pdf เข้าสู่ระบบแล้ว",
    demoSummary:
      "จากไฟล์ kyrin-paper.pdf: ตรวจพบเอกสาร 24 หน้า พร้อม metadata ครบถ้วน, citation 47 รายการ และสร้าง knowledge graph จากเอกสารของคุณเรียบร้อยแล้ว — พร้อมถามเชิงลึกต่อได้เลย",
    removeFile: "ลบไฟล์",
    citationLabel: "อ้างอิง",
    detectGroups: [
      ["ใคร", "พัฒนา"],
      ["ใคร", "สร้าง"],
      ["ใคร", "เขียน"],
      ["ใคร", "ทำ"],
      ["ใคร", "คิดค้น"],
      ["ใคร", "ออกแบบ"],
      ["ใคร", "ดูแล"],
      ["ผู้พัฒนา"],
      ["พัฒนาโดยใคร"],
      ["สร้างโดยใคร"],
    ],
    detectAnswer: "ระบบนี้พัฒนาโดย A70III — ติดตามผลงานและโค้ดได้ที่ GitHub",
    githubLabel: "GitHub",
    sampleAnswers: [
      "กำลังรวบรวมหลักฐานจากเอกสารของคุณ แล้วจะสรุปให้ทันที",
      "เจอแหล่งอ้างอิงที่ตรงกับคำถามแล้ว กำลังจัดระเบียบคำตอบ",
      "นี่คือคำตอบที่อ้างอิงจากเอกสารในคลังของคุณเอง",
    ],
    greetTriggers: GREET_TRIGGERS,
    greetAnswers: [
      "สวัสดีครับ! ยินดีต้อนรับสู่ Kyrin Research OS — มีอะไรให้ช่วยไหมครับ?",
      "สวัสดีครับ! พร้อมช่วยค้นคว้าเอกสารให้คุณแล้ว — ถามอะไรก็ได้เลยครับ",
    ],
    testTriggers: TEST_TRIGGERS,
    testAnswers: [
      "รับทราบครับ ทดสอบสำเร็จ! ระบบ Kyrin ทำงานปกติ พร้อมให้บริการ",
      "ระบบพร้อมใช้งานครับ! ข้อความของคุณมาถึงเรียบร้อย — ถามอะไรเพิ่มเติมได้เลย",
    ],
    legacyTerms: LEGACY_TRIGGERS,
    legacyAnswer:
      "Kyrin เวอร์ชันเดิม (framework / npm package) เป็นโปรเจกต์ที่หยุดพัฒนาแล้ว แต่ยังเข้าถึงเอกสารเก่าได้ผ่าน GitHub ของ kyrin-labs และเว็บไซต์ legacy.kyrin.dev",
    legacySiteLabel: "legacy.kyrin.dev",
    langLabel: "ภาษา",
    themeLight: "โหมดสว่าง",
    themeDark: "โหมดมืด",
  },
  en: {
    tagline: "Research OS",
    placeholder: "Ask anything…",
    thinking: "Thinking…",
    you: "You",
    attach: "Attach file",
    send: "Send",
    demoFile: "kyrin-paper.pdf",
    demoQuestion: "Summarize this file for me",
    demoUploading: "Uploaded kyrin-paper.pdf into your system",
    demoSummary:
      "From kyrin-paper.pdf: found a 24-page document with complete metadata, 47 citations, and a knowledge graph built from your papers — ready for deep Q&A",
    removeFile: "Remove file",
    citationLabel: "Citation",
    detectGroups: [
      ["who", "develop"],
      ["who", "made"],
      ["who", "make"],
      ["who", "created"],
      ["who", "built"],
      ["who", "wrote"],
      ["who", "design"],
      ["developer"],
      ["created by"],
      ["built by"],
      ["made by"],
    ],
    detectAnswer: "This system was developed by A70III — check out the work on GitHub",
    githubLabel: "GitHub",
    sampleAnswers: [
      "Gathering evidence from your documents — summarising it for you now",
      "Found matching sources in your library, putting the answer together",
      "Here's an answer backed by citations from your own documents",
    ],
    greetTriggers: GREET_TRIGGERS,
    greetAnswers: [
      "Hi there! Welcome to Kyrin Research OS — how can I help you today?",
      "Hello! Ready to dig into your documents — ask me anything",
    ],
    testTriggers: TEST_TRIGGERS,
    testAnswers: [
      "Got it — test successful! Kyrin is running normally and ready to help",
      "System is up and running! Your message came through — ask me anything else",
    ],
    legacyTerms: LEGACY_TRIGGERS,
    legacyAnswer:
      "The original Kyrin (framework / npm package) is no longer under active development, but you can still access the old documentation via the kyrin-labs GitHub and legacy.kyrin.dev",
    legacySiteLabel: "legacy.kyrin.dev",
    langLabel: "Language",
    themeLight: "Light mode",
    themeDark: "Dark mode",
  },
};
