import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpenText, Database, FileText, LockKeyhole, Sparkles } from "lucide-react";

import AppSidebar from "@/components/AppSidebar";
import MarkdownText from "@/components/MarkdownText";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTreatmentIntel, getTreatmentNav } from "@/lib/supabase-rest";
import { cn } from "@/lib/utils";

function dateLabel(value: string | null) {
  if (!value) return "—";
  try {
    return new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "short", day: "numeric" }).format(new Date(value));
  } catch {
    return value;
  }
}

function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className={cn("mb-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-primary/70", light && "text-primary-foreground/60")}>
      <span className={cn("size-1.5 rounded-full bg-primary/60", light && "bg-primary-foreground/55")} />
      {children}
    </div>
  );
}

function IntelCard({ id, title, label, children }: { id: string; title: string; label?: string; children: ReactNode }) {
  return (
    <Card id={id} className="gap-4 rounded-2xl border-border/70 py-7 shadow-card">
      <CardHeader className="gap-2 px-6 sm:px-8">
        {label && <SectionLabel>{label}</SectionLabel>}
        <CardTitle className="text-xl sm:text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-6 sm:px-8">{children}</CardContent>
    </Card>
  );
}

export default async function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [intel, nav] = await Promise.all([getTreatmentIntel(slug), getTreatmentNav()]);
  if (!intel) notFound();

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
      <AppSidebar treatments={nav} currentTreatment={slug} />

      <main className="min-w-0 px-4 py-6 sm:px-6 lg:px-10 lg:py-10 xl:px-14" id="top">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Treatment Intelligence / v0.2</div>
              <Badge variant={intel.source === "supabase" ? "live" : "warning"} className="mt-2">
                <span className="size-1.5 rounded-full bg-current" />
                {intel.source === "supabase" ? "LIVE · Supabase" : "DEMO DATA"}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link href="/learning/start-here" className={buttonVariants({ variant: "outline", size: "sm" })}>
                <BookOpenText aria-hidden="true" /> Learning Wiki
              </Link>
              <div className="hidden rounded-md border bg-card px-3 py-2 text-xs font-medium text-muted-foreground sm:block">Edit in NocoDB → refresh viewer</div>
            </div>
          </div>

          <section className="relative mb-6 overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-primary/[0.11] via-card/95 to-card/90 px-6 py-9 shadow-card backdrop-blur-sm sm:px-10 sm:py-11">
            <div className="absolute -right-16 -top-20 size-64 rounded-full bg-primary/[0.06] blur-2xl" />
            <div className="relative max-w-4xl">
              <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-primary/70">
                <Sparkles className="size-4" aria-hidden="true" /> Clinical intelligence record
              </div>
              <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl">{intel.name_en}</h1>
              <p className="mt-3 text-lg font-medium tracking-tight text-muted-foreground sm:text-2xl">{intel.name_ko}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {intel.method_name && <Badge variant="secondary">{intel.method_name}</Badge>}
                {intel.modality_name && <Badge variant="secondary">{intel.modality_name}</Badge>}
                <Badge variant="warning">{intel.content_status}</Badge>
                <Badge variant="outline"><LockKeyhole aria-hidden="true" /> Internal Only</Badge>
              </div>
            </div>
          </section>

          <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="grid min-w-0 gap-5">
              <IntelCard id="overview" title="Overview" label="Core Treatment Knowledge"><MarkdownText text={intel.overview_ko} /></IntelCard>
              <IntelCard id="effects" title="Expected Effects"><MarkdownText text={intel.expected_effects_ko} /></IntelCard>
              <IntelCard id="mechanism" title="Mechanism"><MarkdownText text={intel.mechanism_ko} /></IntelCard>
              <IntelCard id="procedure" title="Procedure"><MarkdownText text={intel.procedure_ko} /></IntelCard>

              <IntelCard id="patient" title="Patient Experience" label="Patient Experience">
                <div className="mb-7 grid gap-3 md:grid-cols-3">
                  {[
                    ["Duration", intel.duration_ko],
                    ["Pain & Downtime", intel.pain_downtime_ko],
                    ["Results Timeline", intel.results_timeline_ko],
                  ].map(([title, content]) => (
                    <div key={title} className="rounded-xl border bg-muted/35 p-4">
                      <strong className="mb-2.5 block text-xs font-semibold text-primary/80">{title}</strong>
                      <MarkdownText text={content} />
                    </div>
                  ))}
                </div>
                <div className="space-y-7">
                  <div><h3 className="mb-2 text-base font-semibold">Best For</h3><MarkdownText text={intel.best_for_ko} /></div>
                  <div><h3 className="mb-2 text-base font-semibold">Limitations</h3><MarkdownText text={intel.limitations_ko} /></div>
                  <div><h3 className="mb-2 text-base font-semibold">Risks</h3><MarkdownText text={intel.risks_ko} /></div>
                </div>
              </IntelCard>

              <IntelCard id="market" title="Device / Market Intel" label="Market Intelligence">
                <MarkdownText text={intel.device_market_intel_ko} />
                <div className="mt-7 space-y-7 border-t pt-7">
                  <div><h3 className="mb-2 text-base font-semibold">Global Market Intel</h3><MarkdownText text={intel.global_market_intel_ko} /></div>
                  <div><h3 className="mb-2 text-base font-semibold">Korea Market Intel</h3><MarkdownText text={intel.korea_market_intel_ko} /></div>
                </div>
              </IntelCard>

              <IntelCard id="compare" title="Comparison Guide" label="decode.skin Intelligence"><MarkdownText text={intel.comparison_guide_ko} /></IntelCard>

              <Card id="take" className="gap-4 rounded-2xl border-primary bg-primary py-7 text-primary-foreground shadow-lg shadow-primary/10">
                <CardHeader className="gap-2 px-6 sm:px-8">
                  <SectionLabel light>Founder Take</SectionLabel>
                  <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl"><Sparkles className="size-5" aria-hidden="true" /> Founder Take</CardTitle>
                </CardHeader>
                <CardContent className="px-6 sm:px-8 [&_.markdown]:text-primary-foreground/80 [&_.markdown_strong]:text-primary-foreground">
                  <MarkdownText text={intel.founder_take_ko} />
                </CardContent>
              </Card>
            </div>

            <aside className="grid gap-4 xl:sticky xl:top-6">
              <Card className="gap-4 rounded-2xl border-border/70 py-5 shadow-card">
                <CardHeader className="px-5"><SectionLabel>Record</SectionLabel></CardHeader>
                <CardContent className="px-5">
                  <dl className="grid grid-cols-[88px_1fr] gap-x-3 gap-y-3 text-xs">
                    <dt className="text-muted-foreground">Treatment</dt><dd className="font-semibold">{intel.name_en}</dd>
                    <dt className="text-muted-foreground">Method</dt><dd className="font-semibold">{intel.method_name ?? "—"}</dd>
                    <dt className="text-muted-foreground">Modality</dt><dd className="font-semibold">{intel.modality_name ?? "—"}</dd>
                    <dt className="text-muted-foreground">Status</dt><dd className="font-semibold">{intel.content_status}</dd>
                    <dt className="text-muted-foreground">Updated</dt><dd className="font-semibold">{dateLabel(intel.updated_at)}</dd>
                  </dl>
                </CardContent>
              </Card>

              <Card className="gap-3 rounded-2xl border-border/70 py-5 shadow-card">
                <CardHeader className="px-5"><SectionLabel>On this page</SectionLabel></CardHeader>
                <CardContent className="px-5">
                  <nav className="divide-y text-xs" aria-label="On this page">
                    {[
                      ["overview", "Overview"], ["effects", "Expected Effects"], ["mechanism", "Mechanism"], ["procedure", "Procedure"],
                      ["patient", "Patient Experience"], ["market", "Market Intelligence"], ["compare", "Comparison Guide"], ["take", "Founder Take"],
                    ].map(([id, label]) => <a key={id} href={`#${id}`} className="flex items-center justify-between py-2.5 text-muted-foreground transition-colors hover:text-primary">{label}<ArrowRight className="size-3" aria-hidden="true" /></a>)}
                  </nav>
                </CardContent>
              </Card>

              <Card className="gap-3 rounded-2xl border-border/70 py-5 shadow-card">
                <CardHeader className="px-5"><SectionLabel>Learning Link</SectionLabel></CardHeader>
                <CardContent className="px-5">
                  <p className="mb-4 text-xs leading-5 text-muted-foreground">이 Treatment Wiki를 만드는 과정에서 배운 기술 구조와 시행착오는 Learning Wiki에 기록한다.</p>
                  <Link href="/learning/start-here" className={buttonVariants({ size: "sm", className: "w-full" })}>
                    <FileText aria-hidden="true" /> Open Learning Wiki
                  </Link>
                </CardContent>
              </Card>

              <div className="flex items-center justify-center gap-2 py-2 text-[10px] text-muted-foreground">
                <Database className="size-3.5" aria-hidden="true" /> Source of truth: Supabase
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
