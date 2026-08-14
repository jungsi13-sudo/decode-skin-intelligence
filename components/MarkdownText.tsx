import React from "react";

function inline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

export default function MarkdownText({ text }: { text?: string | null }) {
  if (!text) return <p className="empty">아직 입력된 내용이 없습니다.</p>;

  const lines = text.replace(/\r/g, "").split("\n");
  const nodes: React.ReactNode[] = [];
  let bullets: string[] = [];
  let numbers: string[] = [];

  const flushBullets = () => {
    if (!bullets.length) return;
    nodes.push(<ul key={`ul-${nodes.length}`}>{bullets.map((x, i) => <li key={i}>{inline(x)}</li>)}</ul>);
    bullets = [];
  };
  const flushNumbers = () => {
    if (!numbers.length) return;
    nodes.push(<ol key={`ol-${nodes.length}`}>{numbers.map((x, i) => <li key={i}>{inline(x)}</li>)}</ol>);
    numbers = [];
  };
  const flush = () => { flushBullets(); flushNumbers(); };

  lines.forEach((raw, index) => {
    const line = raw.trim();
    if (!line) { flush(); return; }
    if (line.startsWith("- ")) { flushNumbers(); bullets.push(line.slice(2)); return; }
    if (/^\d+\.\s/.test(line)) { flushBullets(); numbers.push(line.replace(/^\d+\.\s/, "")); return; }
    flush();
    if (line.startsWith("## ")) nodes.push(<h3 key={index}>{inline(line.slice(3))}</h3>);
    else if (line.startsWith("### ")) nodes.push(<h4 key={index}>{inline(line.slice(4))}</h4>);
    else nodes.push(<p key={index}>{inline(line)}</p>);
  });
  flush();
  return <div className="markdown">{nodes}</div>;
}
