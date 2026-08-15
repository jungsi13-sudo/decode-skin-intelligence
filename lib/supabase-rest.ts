import { demoTreatment } from "./demo-data";
import type { TreatmentIntel, TreatmentNavItem } from "./types";

const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const apiKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

function headers() {
  return apiKey ? { apikey: apiKey } : undefined;
}

async function getJson<T>(path: string): Promise<T> {
  if (!projectUrl || !apiKey) throw new Error("Supabase environment variables are missing");
  const res = await fetch(`${projectUrl}/rest/v1/${path}`, {
    headers: headers(),
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Supabase ${res.status}: ${body}`);
  }
  return res.json() as Promise<T>;
}

export async function getTreatmentNav(): Promise<TreatmentNavItem[]> {
  try {
    return await getJson<TreatmentNavItem[]>(
      "treatments?select=slug,name_ko,name_en&order=name_en.asc"
    );
  } catch {
    return [
      { slug: "rf-skin-tightening", name_ko: "고주파 피부 타이트닝", name_en: "RF Skin Tightening" },
      { slug: "hifu-skin-tightening", name_ko: "초음파 피부 타이트닝", name_en: "HIFU Skin Tightening" },
      { slug: "microneedling-rf", name_ko: "마이크로니들링 고주파", name_en: "Microneedling RF" },
      { slug: "botulinum-toxin-injection", name_ko: "보툴리눔 톡신 주사", name_en: "Botulinum Toxin Injection" },
    ];
  }
}

export async function getTreatmentIntel(slug: string): Promise<TreatmentIntel | null> {
  try {
    const treatments = await getJson<Array<{
      id: string; name_ko: string; name_en: string; slug: string;
      method_id: string | null; modality_id: string | null;
    }>>(`treatments?slug=eq.${encodeURIComponent(slug)}&select=id,name_ko,name_en,slug,method_id,modality_id&limit=1`);

    const treatment = treatments[0];
    if (!treatment) return null;

    const [contents, methods, modalities] = await Promise.all([
      getJson<any[]>(`treatment_content?treatment_id=eq.${treatment.id}&select=*&limit=1`),
      treatment.method_id
        ? getJson<any[]>(`treatment_methods?id=eq.${treatment.method_id}&select=name_en&limit=1`)
        : Promise.resolve([]),
      treatment.modality_id
        ? getJson<any[]>(`modalities?id=eq.${treatment.modality_id}&select=name_en&limit=1`)
        : Promise.resolve([]),
    ]);

    const content = contents[0] || {};
    return {
      id: treatment.id,
      name_ko: treatment.name_ko,
      name_en: treatment.name_en,
      slug: treatment.slug,
      method_name: methods[0]?.name_en ?? null,
      modality_name: modalities[0]?.name_en ?? null,
      content_status: content.content_status ?? "draft",
      updated_at: content.updated_at ?? null,
      overview_ko: content.overview_ko ?? null,
      expected_effects_ko: content.expected_effects_ko ?? null,
      mechanism_ko: content.mechanism_ko ?? null,
      procedure_ko: content.procedure_ko ?? null,
      duration_ko: content.duration_ko ?? null,
      pain_downtime_ko: content.pain_downtime_ko ?? null,
      results_timeline_ko: content.results_timeline_ko ?? null,
      best_for_ko: content.best_for_ko ?? null,
      limitations_ko: content.limitations_ko ?? null,
      risks_ko: content.risks_ko ?? null,
      device_market_intel_ko: content.device_market_intel_ko ?? null,
      global_market_intel_ko: content.global_market_intel_ko ?? null,
      korea_market_intel_ko: content.korea_market_intel_ko ?? null,
      comparison_guide_ko: content.comparison_guide_ko ?? null,
      founder_take_ko: content.founder_take_ko ?? null,
      source: "supabase",
    };
  } catch (error) {
    console.error("Supabase fetch failed; using demo data:", error);
    if (slug === demoTreatment.slug) return demoTreatment;

    const fallback = [
      { slug: "hifu-skin-tightening", name_ko: "초음파 피부 타이트닝", name_en: "HIFU Skin Tightening", method_name: "External / Non-invasive", modality_name: "Focused Ultrasound" },
      { slug: "microneedling-rf", name_ko: "마이크로니들링 고주파", name_en: "Microneedling RF", method_name: "Microneedling", modality_name: "Radiofrequency" },
      { slug: "botulinum-toxin-injection", name_ko: "보툴리눔 톡신 주사", name_en: "Botulinum Toxin Injection", method_name: "Injection", modality_name: "Botulinum Toxin" },
    ].find((item) => item.slug === slug);

    if (!fallback) return null;
    return {
      ...demoTreatment,
      id: `demo-${fallback.slug}`,
      ...fallback,
      content_status: "empty",
      updated_at: null,
      overview_ko: null,
      expected_effects_ko: null,
      mechanism_ko: null,
      procedure_ko: null,
      duration_ko: null,
      pain_downtime_ko: null,
      results_timeline_ko: null,
      best_for_ko: null,
      limitations_ko: null,
      risks_ko: null,
      device_market_intel_ko: null,
      global_market_intel_ko: null,
      korea_market_intel_ko: null,
      comparison_guide_ko: null,
      founder_take_ko: null,
      source: "demo",
    };
  }
}
