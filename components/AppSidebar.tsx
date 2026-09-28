import Link from "next/link";
import { BookOpenText, Database, Sparkles } from "lucide-react";

import { learningGroups } from "@/lib/learning-wiki";
import type { TreatmentNavItem } from "@/lib/types";
import { cn } from "@/lib/utils";

const fallbackTreatments: TreatmentNavItem[] = [
  { slug: "rf-skin-tightening", name_ko: "고주파 피부 타이트닝", name_en: "RF Skin Tightening" },
  { slug: "hifu-skin-tightening", name_ko: "초음파 피부 타이트닝", name_en: "HIFU Skin Tightening" },
  { slug: "microneedling-rf", name_ko: "마이크로니들링 고주파", name_en: "Microneedling RF" },
  { slug: "botulinum-toxin-injection", name_ko: "보툴리눔 톡신 주사", name_en: "Botulinum Toxin Injection" },
];

export default function AppSidebar({
  treatments = fallbackTreatments,
  currentTreatment,
  currentLearning,
}: {
  treatments?: TreatmentNavItem[];
  currentTreatment?: string;
  currentLearning?: string;
}) {
  return (
    <>
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur lg:hidden">
        <Link href="/learning/start-here" className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-4" aria-hidden="true" />
          </span>
          <span className="text-sm font-bold tracking-tight">decode.skin</span>
        </Link>
        <nav className="flex items-center gap-1 text-xs font-medium">
          <Link href="/learning/start-here" className="rounded-md px-2.5 py-2 text-muted-foreground hover:bg-accent hover:text-foreground">
            Learning
          </Link>
          <Link href="/treatments/rf-skin-tightening" className="rounded-md px-2.5 py-2 text-muted-foreground hover:bg-accent hover:text-foreground">
            Treatments
          </Link>
        </nav>
      </header>

      <aside className="hidden h-screen flex-col overflow-y-auto border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:sticky lg:top-0 lg:flex">
        <div className="border-b border-sidebar-border px-5 py-6">
          <Link href="/learning/start-here" className="group flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-sm transition-transform group-hover:-rotate-3">
              <Sparkles className="size-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-base font-bold tracking-tight">decode.skin</span>
              <span className="block text-[10px] font-medium tracking-wide text-sidebar-foreground/55">INTELLIGENCE WIKI</span>
            </span>
          </Link>
        </div>

        <div className="flex-1 space-y-7 px-3 py-5">
          <section>
            <div className="mb-2 flex items-center gap-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-sidebar-foreground/45">
              <Database className="size-3.5" aria-hidden="true" />
              Treatment Intelligence
            </div>
            <nav className="space-y-1" aria-label="Treatment Intelligence">
              {treatments.map((item) => {
                const active = item.slug === currentTreatment;
                return (
                  <Link
                    key={item.slug}
                    href={`/treatments/${item.slug}`}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-lg px-3 py-2.5 text-[13px] leading-tight transition-colors",
                      active
                        ? "bg-sidebar-primary font-semibold text-sidebar-primary-foreground shadow-sm"
                        : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    )}
                  >
                    {item.name_en}
                    <span className={cn("mt-1 block text-[10px] font-normal", active ? "text-sidebar-primary-foreground/60" : "text-sidebar-foreground/40")}>
                      {item.name_ko}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </section>

          <section>
            <div className="mb-2 flex items-center gap-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-sidebar-foreground/45">
              <BookOpenText className="size-3.5" aria-hidden="true" />
              Learning Wiki
            </div>
            <div className="space-y-4">
              {learningGroups.map((group) => (
                <div key={group.label}>
                  <div className="px-3 pb-1 text-[9px] font-bold uppercase tracking-[0.14em] text-sidebar-foreground/30">{group.label}</div>
                  <nav className="space-y-0.5" aria-label={group.label}>
                    {group.pages.map((page) => {
                      const active = page.slug === currentLearning;
                      return (
                        <Link
                          key={page.slug}
                          href={`/learning/${page.slug}`}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "grid grid-cols-[26px_1fr] items-start rounded-lg px-3 py-2 text-[11px] leading-snug transition-colors",
                            active
                              ? "bg-sidebar-primary font-semibold text-sidebar-primary-foreground"
                              : "text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          )}
                        >
                          <span className={active ? "text-sidebar-primary-foreground/55" : "text-sidebar-foreground/35"}>
                            {String(page.index).padStart(2, "0")}
                          </span>
                          <span>{page.title.split(" — ")[0]}</span>
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="border-t border-sidebar-border px-5 py-4 text-[10px] leading-relaxed text-sidebar-foreground/40">
          Internal knowledge system<br />Supabase · Next.js · Vercel
        </div>
      </aside>
    </>
  );
}
