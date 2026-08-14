export default function ArchitectureMap() {
  return (
    <div className="architectureMap" aria-label="decode.skin architecture flow">
      <div className="architectureGoal">
        <span>ONE SHARED GOAL</span>
        <strong>데이터를 관리하고 → 웹사이트로 만들고 → 인터넷에서 실제로 사용한다</strong>
      </div>

      <div className="architectureColumns">
        <div className="archLane">
          <div className="archLaneTitle">DATA</div>
          <div className="archNode strongNode">NocoDB<small>입력 · 수정 · Grid 운영</small></div>
          <div className="archArrow">↓</div>
          <div className="archNode coreNode">Supabase<small>PostgreSQL · Master Data · API/Auth</small></div>
        </div>

        <div className="archLane">
          <div className="archLaneTitle">BUILD</div>
          <div className="archNode agentNode">Codex / VS Code<small>코드를 만들고 수정</small></div>
          <div className="archArrow">↓</div>
          <div className="archNode strongNode">React + Next.js<small>Frontend / Viewer / Product UI</small></div>
        </div>

        <div className="archLane">
          <div className="archLaneTitle">SHIP</div>
          <div className="archNode">GitHub<small>코드 + 변경 이력 저장</small></div>
          <div className="archArrow">↓</div>
          <div className="archNode strongNode">Vercel<small>Build · Deploy · Hosting</small></div>
        </div>
      </div>

      <div className="architectureJoin">
        <span>Supabase data</span><b>+</b><span>Next.js code</span><b>→</b><strong>Browser에서 실제 decode.skin</strong>
      </div>

      <div className="architectureFootnotes">
        <span><b>Directus + Render</b> — 보조 CMS/Admin 실험</span>
        <span><b>Docker</b> — Directus를 표준 실행환경으로 패키징</span>
        <span><b>Notion</b> — 설계/정책 source of truth</span>
      </div>
    </div>
  );
}
