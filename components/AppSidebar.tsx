import Link from "next/link";
import type { TreatmentNavItem } from "@/lib/types";
import { learningGroups } from "@/lib/learning-wiki";

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
    <aside className="sidebar">
      <Link href="/learning/start-here" className="brandLink">
        <div className="brand">decode.skin</div>
        <div className="brandSub">Intelligence & Learning Wiki</div>
      </Link>

      <div className="navLabel">Treatment Intelligence</div>
      <nav className="nav">
        {treatments.map((item) => (
          <Link key={item.slug} className={item.slug === currentTreatment ? "active" : ""} href={`/treatments/${item.slug}`}>
            {item.name_en}<small>{item.name_ko}</small>
          </Link>
        ))}
      </nav>

      <div className="navDivider" />
      <div className="navLabel">Learning Wiki</div>
      {learningGroups.map((group) => (
        <div key={group.label} className="learningNavGroup">
          <div className="learningNavLabel">{group.label}</div>
          <nav className="nav learningNav">
            {group.pages.map((page) => (
              <Link key={page.slug} className={page.slug === currentLearning ? "active" : ""} href={`/learning/${page.slug}`}>
                <span className="chapterNo">{String(page.index).padStart(2, "0")}</span>{page.title.split(" — ")[0]}
              </Link>
            ))}
          </nav>
        </div>
      ))}
    </aside>
  );
}
