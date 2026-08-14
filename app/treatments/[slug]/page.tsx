import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownText from "@/components/MarkdownText";
import AppSidebar from "@/components/AppSidebar";
import { getTreatmentIntel, getTreatmentNav } from "@/lib/supabase-rest";

function dateLabel(value: string | null) {
  if (!value) return "—";
  try {
    return new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "short", day: "numeric" }).format(new Date(value));
  } catch { return value; }
}

export default async function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [intel, nav] = await Promise.all([getTreatmentIntel(slug), getTreatmentNav()]);
  if (!intel) notFound();

  return (
    <div className="appShell">
      <AppSidebar treatments={nav} currentTreatment={slug} />

      <main className="main" id="top">
        <div className="wrap">
          <div className="topbar">
            <div>
              <div className="eyebrow">Treatment Intelligence / v0.2</div>
              <div className={`dataBadge ${intel.source}`}>{intel.source === "supabase" ? "LIVE · Supabase" : "DEMO DATA"}</div>
            </div>
            <div className="topbarActions">
              <Link className="switchWiki" href="/learning/start-here">Learning Wiki</Link>
              <div className="editHint">Edit in NocoDB → refresh viewer</div>
            </div>
          </div>

          <section className="hero">
            <h1>{intel.name_en}</h1>
            <div className="koTitle">{intel.name_ko}</div>
            <div className="chips">
              {intel.method_name && <span className="chip">{intel.method_name}</span>}
              {intel.modality_name && <span className="chip">{intel.modality_name}</span>}
              <span className="chip status">{intel.content_status}</span>
              <span className="chip">Internal Only</span>
            </div>
          </section>

          <div className="contentGrid">
            <div className="stack">
              <section className="card" id="overview"><div className="sectionTitle">Core Treatment Knowledge</div><h2>Overview</h2><MarkdownText text={intel.overview_ko} /></section>
              <section className="card" id="effects"><h2>Expected Effects</h2><MarkdownText text={intel.expected_effects_ko} /></section>
              <section className="card" id="mechanism"><h2>Mechanism</h2><MarkdownText text={intel.mechanism_ko} /></section>
              <section className="card" id="procedure"><h2>Procedure</h2><MarkdownText text={intel.procedure_ko} /></section>

              <section className="card" id="patient">
                <div className="sectionTitle">Patient Experience</div>
                <h2>Patient Experience</h2>
                <div className="patientGrid">
                  <div className="mini"><strong>Duration</strong><MarkdownText text={intel.duration_ko} /></div>
                  <div className="mini"><strong>Pain & Downtime</strong><MarkdownText text={intel.pain_downtime_ko} /></div>
                  <div className="mini"><strong>Results Timeline</strong><MarkdownText text={intel.results_timeline_ko} /></div>
                </div>
                <h3>Best For</h3><MarkdownText text={intel.best_for_ko} />
                <h3>Limitations</h3><MarkdownText text={intel.limitations_ko} />
                <h3>Risks</h3><MarkdownText text={intel.risks_ko} />
              </section>

              <section className="card" id="market">
                <div className="sectionTitle">Market Intelligence</div>
                <h2>Device / Market Intel</h2><MarkdownText text={intel.device_market_intel_ko} />
                <h3>Global Market Intel</h3><MarkdownText text={intel.global_market_intel_ko} />
                <h3>Korea Market Intel</h3><MarkdownText text={intel.korea_market_intel_ko} />
              </section>

              <section className="card" id="compare"><div className="sectionTitle">decode.skin Intelligence</div><h2>Comparison Guide</h2><MarkdownText text={intel.comparison_guide_ko} /></section>
              <section className="card take" id="take"><div className="sectionTitle">Founder Take</div><MarkdownText text={intel.founder_take_ko} /></section>
            </div>

            <aside className="rail">
              <section className="card compact">
                <div className="sectionTitle">Record</div>
                <dl className="kv">
                  <dt>Treatment</dt><dd>{intel.name_en}</dd>
                  <dt>Method</dt><dd>{intel.method_name ?? "—"}</dd>
                  <dt>Modality</dt><dd>{intel.modality_name ?? "—"}</dd>
                  <dt>Status</dt><dd>{intel.content_status}</dd>
                  <dt>Updated</dt><dd>{dateLabel(intel.updated_at)}</dd>
                </dl>
              </section>
              <section className="card compact toc">
                <div className="sectionTitle">On this page</div>
                <a href="#overview">Overview</a><a href="#effects">Expected Effects</a><a href="#mechanism">Mechanism</a><a href="#procedure">Procedure</a><a href="#patient">Patient Experience</a><a href="#market">Market Intelligence</a><a href="#compare">Comparison Guide</a><a href="#take">Founder Take</a>
              </section>
              <section className="card compact">
                <div className="sectionTitle">Learning Link</div>
                <p className="railCopy">이 Treatment Wiki를 만드는 과정에서 배운 기술 구조와 시행착오는 Learning Wiki에 기록한다.</p>
                <Link className="railButton" href="/learning/start-here">Open Learning Wiki →</Link>
              </section>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
