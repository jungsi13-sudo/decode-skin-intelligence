import Link from "next/link";
import { notFound } from "next/navigation";
import AppSidebar from "@/components/AppSidebar";
import ArchitectureMap from "@/components/ArchitectureMap";
import { getLearningPage, learningPages } from "@/lib/learning-wiki";

export function generateStaticParams() {
  return learningPages.map((page) => ({ slug: page.slug }));
}

function Section({ title, paragraphs, bullets, code, note }: any) {
  return (
    <section className="learningSection">
      <h2>{title}</h2>
      {paragraphs?.map((p: string, i: number) => <p key={i}>{p}</p>)}
      {bullets && <ul>{bullets.map((b: string, i: number) => <li key={i}>{b}</li>)}</ul>}
      {code && <pre className="conceptCode">{code}</pre>}
      {note && <div className="learningNote">{note}</div>}
    </section>
  );
}

export default async function LearningPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getLearningPage(slug);
  if (!page) notFound();

  const currentIndex = learningPages.findIndex((p) => p.slug === slug);
  const prev = currentIndex > 0 ? learningPages[currentIndex - 1] : null;
  const next = currentIndex < learningPages.length - 1 ? learningPages[currentIndex + 1] : null;

  return (
    <div className="appShell">
      <AppSidebar currentLearning={slug} />
      <main className="main learningMain">
        <div className="learningWrap">
          <div className="learningTopbar">
            <div>
              <div className="eyebrow">Founder Technical Handbook / Learning Wiki</div>
              <div className="learningIndex">CHAPTER {String(page.index).padStart(2, "0")} · {page.category}</div>
            </div>
            <Link className="switchWiki" href="/treatments/rf-skin-tightening">Treatment Wiki →</Link>
          </div>

          <header className="learningHero">
            <div className="learningKicker">QUESTION-DRIVEN DOCUMENTATION</div>
            <h1>{page.title}</h1>
            <p>{page.subtitle}</p>
            <div className="toolChips">{page.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
          </header>

          {slug === "start-here" && <ArchitectureMap />}

          <div className="learningGrid">
            <article className="learningArticle">
              <section className="questionBlock">
                <div className="questionLabel">THE QUESTIONS THAT STARTED THIS</div>
                {page.questions.map((q, i) => <blockquote key={i}>“{q}”</blockquote>)}
              </section>

              <section className="whyGrid">
                <div className="whyCard"><span>WHY THIS CAME UP</span><p>{page.why}</p></div>
                <div className="whyCard"><span>THE CONFUSION</span><p>{page.confusion}</p></div>
              </section>

              <section className="simpleAnswer">
                <span>THE SIMPLE ANSWER</span>
                <strong>{page.simpleAnswer}</strong>
              </section>

              {page.sections.map((section, i) => <Section key={i} {...section} />)}

              <section className="learningSection takeawaySection">
                <h2>What I need to remember</h2>
                <ol>{page.remember.map((item, i) => <li key={i}>{item}</li>)}</ol>
              </section>

              <section className="learningSection laterSection">
                <h2>When this matters later</h2>
                <ul>{page.later.map((item, i) => <li key={i}>{item}</li>)}</ul>
              </section>

              {page.references?.length ? (
                <section className="learningSection referencesSection">
                  <h2>Official references</h2>
                  <div className="referenceList">
                    {page.references.map((ref) => <a key={ref.href} href={ref.href} target="_blank" rel="noreferrer">{ref.label} ↗</a>)}
                  </div>
                </section>
              ) : null}

              <nav className="chapterPager">
                {prev ? <Link href={`/learning/${prev.slug}`}><span>← Previous</span><strong>{prev.title}</strong></Link> : <div />}
                {next ? <Link href={`/learning/${next.slug}`} className="next"><span>Next →</span><strong>{next.title}</strong></Link> : <div />}
              </nav>
            </article>

            <aside className="learningRail">
              <div className="railCard">
                <div className="railTitle">WHY THIS WIKI EXISTS</div>
                <p>정답만 저장하지 않는다. <strong>왜 질문이 생겼고 어떤 시행착오를 거쳐 이해했는지</strong>까지 보존한다.</p>
              </div>
              <div className="railCard">
                <div className="railTitle">CURRENT STACK</div>
                <div className="stackLine"><span>Data</span><b>Supabase</b></div>
                <div className="stackLine"><span>Admin</span><b>NocoDB</b></div>
                <div className="stackLine"><span>Frontend</span><b>Next.js + React</b></div>
                <div className="stackLine"><span>Code</span><b>GitHub</b></div>
                <div className="stackLine"><span>Deploy</span><b>Vercel</b></div>
              </div>
              <div className="railCard tocMini">
                <div className="railTitle">LEARNING TRAIL</div>
                {learningPages.map((item) => (
                  <Link key={item.slug} className={item.slug === slug ? "active" : ""} href={`/learning/${item.slug}`}>
                    <span>{String(item.index).padStart(2, "0")}</span>{item.title.split(" — ")[0]}
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
