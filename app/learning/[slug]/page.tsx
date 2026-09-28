import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpenText, ExternalLink, Lightbulb, Network, Sparkles } from "lucide-react";

import AppSidebar from "@/components/AppSidebar";
import ArchitectureMap from "@/components/ArchitectureMap";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLearningPage, learningPages, type LearningSection } from "@/lib/learning-wiki";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return learningPages.map((page) => ({ slug: page.slug }));
}

function Section({ title, paragraphs, bullets, code, note }: LearningSection) {
  return (
    <Card className="gap-4 rounded-2xl border-border/70 py-7 shadow-card">
      <CardHeader className="px-6 sm:px-8">
        <CardTitle className="text-xl sm:text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 px-6 text-[15px] leading-7 text-foreground/80 sm:px-8">
        {paragraphs?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        {bullets && <ul className="ml-5 list-disc space-y-2 marker:text-primary/60">{bullets.map((bullet, index) => <li key={index}>{bullet}</li>)}</ul>}
        {code && <pre className="mt-4 overflow-auto whitespace-pre-wrap rounded-xl bg-primary p-5 font-mono text-xs font-medium leading-6 text-primary-foreground sm:p-6">{code}</pre>}
        {note && (
          <div className="mt-4 flex gap-3 rounded-xl border border-primary/15 bg-accent/45 p-4 text-sm leading-6 text-accent-foreground">
            <Lightbulb className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <span>{note}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default async function LearningPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getLearningPage(slug);
  if (!page) notFound();

  const currentIndex = learningPages.findIndex((item) => item.slug === slug);
  const prev = currentIndex > 0 ? learningPages[currentIndex - 1] : null;
  const next = currentIndex < learningPages.length - 1 ? learningPages[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
      <AppSidebar currentLearning={slug} />

      <main className="min-w-0 px-4 py-6 sm:px-6 lg:px-10 lg:py-8 xl:px-14">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Founder Technical Handbook / Learning Wiki</div>
              <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary/60">Chapter {String(page.index).padStart(2, "0")} · {page.category}</div>
            </div>
            <Link href="/treatments/rf-skin-tightening" className={buttonVariants({ variant: "outline", size: "sm" })}>
              Treatment Wiki <ArrowRight aria-hidden="true" />
            </Link>
          </div>

          <header className="relative mb-6 overflow-hidden rounded-3xl border border-white/70 bg-card/90 px-6 py-9 shadow-card backdrop-blur-sm sm:px-10 sm:py-11">
            <div className="absolute -right-20 -top-24 size-72 rounded-full bg-accent/60 blur-2xl" />
            <div className="relative max-w-4xl">
              <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.17em] text-primary/65">
                <BookOpenText className="size-4" aria-hidden="true" /> Question-driven documentation
              </div>
              <h1 className="text-3xl font-bold leading-[1.18] tracking-[-0.04em] sm:text-4xl lg:text-5xl">{page.title}</h1>
              <p className="mt-5 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">{page.subtitle}</p>
              <div className="mt-6 flex flex-wrap gap-2">{page.tools.map((tool) => <Badge key={tool} variant="secondary">{tool}</Badge>)}</div>
            </div>
          </header>

          {slug === "start-here" && <ArchitectureMap />}

          <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
            <article className="grid min-w-0 gap-5">
              <section className="rounded-2xl bg-primary px-6 py-7 text-primary-foreground shadow-lg shadow-primary/10 sm:px-8">
                <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-primary-foreground/55">
                  <Sparkles className="size-4" aria-hidden="true" /> The questions that started this
                </div>
                <div className="space-y-4">
                  {page.questions.map((question, index) => <blockquote key={index} className="text-lg font-semibold leading-relaxed tracking-tight sm:text-xl">“{question}”</blockquote>)}
                </div>
              </section>

              <section className="grid gap-4 md:grid-cols-2">
                <Card className="gap-2 rounded-2xl border-border/70 py-6 shadow-card">
                  <CardHeader className="px-6"><div className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary/60">Why this came up</div></CardHeader>
                  <CardContent className="px-6 text-sm leading-6 text-muted-foreground">{page.why}</CardContent>
                </Card>
                <Card className="gap-2 rounded-2xl border-border/70 py-6 shadow-card">
                  <CardHeader className="px-6"><div className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary/60">The confusion</div></CardHeader>
                  <CardContent className="px-6 text-sm leading-6 text-muted-foreground">{page.confusion}</CardContent>
                </Card>
              </section>

              <section className="rounded-2xl border border-primary/15 bg-accent/55 px-6 py-6 sm:px-8">
                <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-primary/65">
                  <Lightbulb className="size-4" aria-hidden="true" /> The simple answer
                </div>
                <strong className="block text-lg leading-relaxed tracking-tight text-accent-foreground sm:text-xl">{page.simpleAnswer}</strong>
              </section>

              {page.sections.map((section, index) => <Section key={index} {...section} />)}

              <Card className="gap-4 rounded-2xl border-primary/15 bg-primary/[0.035] py-7 shadow-card">
                <CardHeader className="px-6 sm:px-8"><CardTitle className="text-xl sm:text-2xl">What I need to remember</CardTitle></CardHeader>
                <CardContent className="px-6 sm:px-8">
                  <ol className="ml-5 list-decimal space-y-2 text-[15px] leading-7 text-foreground/80 marker:font-semibold marker:text-primary">{page.remember.map((item, index) => <li key={index}>{item}</li>)}</ol>
                </CardContent>
              </Card>

              <Card className="gap-4 rounded-2xl border-amber-200/70 bg-amber-50/50 py-7 shadow-card">
                <CardHeader className="px-6 sm:px-8"><CardTitle className="text-xl sm:text-2xl">When this matters later</CardTitle></CardHeader>
                <CardContent className="px-6 sm:px-8">
                  <ul className="ml-5 list-disc space-y-2 text-[15px] leading-7 text-foreground/75 marker:text-amber-600">{page.later.map((item, index) => <li key={index}>{item}</li>)}</ul>
                </CardContent>
              </Card>

              {page.references?.length ? (
                <Card className="gap-4 rounded-2xl border-border/70 py-7 shadow-card">
                  <CardHeader className="px-6 sm:px-8"><CardTitle className="text-xl sm:text-2xl">Official references</CardTitle></CardHeader>
                  <CardContent className="flex flex-wrap gap-2 px-6 sm:px-8">
                    {page.references.map((reference) => (
                      <a key={reference.href} href={reference.href} target="_blank" rel="noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
                        {reference.label} <ExternalLink aria-hidden="true" />
                      </a>
                    ))}
                  </CardContent>
                </Card>
              ) : null}

              <nav className="grid gap-3 pt-1 sm:grid-cols-2" aria-label="Chapter navigation">
                {prev ? (
                  <Link href={`/learning/${prev.slug}`} className="group rounded-2xl border border-white/70 bg-card/90 p-5 shadow-card transition-colors hover:border-primary/25 hover:bg-accent/40">
                    <span className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground"><ArrowLeft className="size-3.5" aria-hidden="true" /> Previous</span>
                    <strong className="text-sm leading-snug group-hover:text-primary">{prev.title}</strong>
                  </Link>
                ) : <div />}
                {next ? (
                  <Link href={`/learning/${next.slug}`} className="group rounded-2xl border border-white/70 bg-card/90 p-5 text-right shadow-card transition-colors hover:border-primary/25 hover:bg-accent/40">
                    <span className="mb-2 flex items-center justify-end gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Next <ArrowRight className="size-3.5" aria-hidden="true" /></span>
                    <strong className="text-sm leading-snug group-hover:text-primary">{next.title}</strong>
                  </Link>
                ) : <div />}
              </nav>
            </article>

            <aside className="grid gap-4 xl:sticky xl:top-6">
              <Card className="gap-3 rounded-2xl border-border/70 py-5 shadow-card">
                <CardHeader className="px-5">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-primary/60"><BookOpenText className="size-3.5" aria-hidden="true" /> Why this wiki exists</div>
                </CardHeader>
                <CardContent className="px-5 text-xs leading-5 text-muted-foreground">정답만 저장하지 않는다. <strong className="font-semibold text-foreground">왜 질문이 생겼고 어떤 시행착오를 거쳐 이해했는지</strong>까지 보존한다.</CardContent>
              </Card>

              <Card className="gap-3 rounded-2xl border-border/70 py-5 shadow-card">
                <CardHeader className="px-5">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-primary/60"><Network className="size-3.5" aria-hidden="true" /> Current stack</div>
                </CardHeader>
                <CardContent className="divide-y px-5">
                  {[["Data", "Supabase"], ["Admin", "NocoDB"], ["Frontend", "Next.js + React"], ["Code", "GitHub"], ["Deploy", "Vercel"]].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-3 py-2.5 text-xs"><span className="text-muted-foreground">{label}</span><b className="font-semibold">{value}</b></div>
                  ))}
                </CardContent>
              </Card>

              <Card className="hidden max-h-[52vh] gap-3 overflow-auto rounded-2xl border-border/70 py-5 shadow-card xl:flex">
                <CardHeader className="px-5"><div className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary/60">Learning trail</div></CardHeader>
                <CardContent className="divide-y px-5">
                  {learningPages.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/learning/${item.slug}`}
                      className={cn("grid grid-cols-[26px_1fr] gap-1 py-2.5 text-[11px] leading-snug text-muted-foreground transition-colors hover:text-primary", item.slug === slug && "font-semibold text-primary")}
                    >
                      <span className="text-muted-foreground/60">{String(item.index).padStart(2, "0")}</span>
                      <span>{item.title.split(" — ")[0]}</span>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
