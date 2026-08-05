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
  langLabel: string;
  themeLight: string;
  themeDark: string;
}

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
    langLabel: "Language",
    themeLight: "Light mode",
    themeDark: "Dark mode",
  },
};
