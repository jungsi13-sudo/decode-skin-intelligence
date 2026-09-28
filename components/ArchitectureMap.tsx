import { ArrowDown, ArrowRight, Cloud, Code2, Database, PanelsTopLeft } from "lucide-react";

type ArchitectureLane = {
  title: string;
  icon: typeof Database;
  nodes: Array<{
    name: string;
    detail: string;
    emphasis?: boolean;
    core?: boolean;
  }>;
};

const lanes: ArchitectureLane[] = [
  {
    title: "Data",
    icon: Database,
    nodes: [
      { name: "NocoDB", detail: "입력 · 수정 · Grid 운영", emphasis: true },
      { name: "Supabase", detail: "PostgreSQL · Master Data · API/Auth", core: true },
    ],
  },
  {
    title: "Build",
    icon: Code2,
    nodes: [
      { name: "Codex / VS Code", detail: "코드를 만들고 수정" },
      { name: "React + Next.js", detail: "Frontend · Viewer · Product UI", emphasis: true },
    ],
  },
  {
    title: "Ship",
    icon: Cloud,
    nodes: [
      { name: "GitHub", detail: "코드 + 변경 이력 저장" },
      { name: "Vercel", detail: "Build · Deploy · Hosting", emphasis: true },
    ],
  },
];

export default function ArchitectureMap() {
  return (
    <section className="mb-6 overflow-hidden rounded-3xl border border-primary/15 bg-primary p-5 text-primary-foreground shadow-lg shadow-primary/10 sm:p-8" aria-label="decode.skin architecture flow">
      <div className="mx-auto max-w-3xl pb-7 text-center">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground/55">One shared goal</div>
        <h2 className="text-xl font-semibold leading-snug tracking-tight sm:text-2xl">데이터를 관리하고 → 웹사이트로 만들고 → 인터넷에서 실제로 사용한다</h2>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {lanes.map(({ title, icon: Icon, nodes }) => (
          <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.045] p-3.5">
            <div className="mb-3 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-primary-foreground/50">
              <Icon className="size-3.5" aria-hidden="true" />
              {title}
            </div>
            {nodes.map((node, index) => (
              <div key={node.name}>
                <div
                  className={
                    node.core
                      ? "rounded-xl border border-emerald-200/70 bg-emerald-50 px-4 py-4 text-center text-emerald-950"
                      : node.emphasis
                        ? "rounded-xl border border-sky-100/70 bg-sky-50 px-4 py-4 text-center text-sky-950"
                        : "rounded-xl border border-white/10 bg-white/[0.07] px-4 py-4 text-center"
                  }
                >
                  <strong className="block text-sm font-semibold">{node.name}</strong>
                  <span className="mt-1 block text-[10px] opacity-55">{node.detail}</span>
                </div>
                {index < nodes.length - 1 && <ArrowDown className="mx-auto my-2 size-4 text-primary-foreground/35" aria-hidden="true" />}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-xs">
        <span className="text-primary-foreground/55">Supabase data</span>
        <span className="text-primary-foreground/30">+</span>
        <span className="text-primary-foreground/55">Next.js code</span>
        <ArrowRight className="size-3.5 text-primary-foreground/40" aria-hidden="true" />
        <span className="inline-flex items-center gap-1.5 font-semibold">
          <PanelsTopLeft className="size-3.5" aria-hidden="true" /> Browser에서 실제 decode.skin
        </span>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-1 text-[10px] text-primary-foreground/45">
        <span><b className="text-primary-foreground/65">Directus + Render</b> — 보조 CMS/Admin 실험</span>
        <span><b className="text-primary-foreground/65">Docker</b> — 표준 실행환경</span>
        <span><b className="text-primary-foreground/65">Notion</b> — 설계/정책 source of truth</span>
      </div>
    </section>
  );
}
