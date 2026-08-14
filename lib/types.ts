export type TreatmentIntel = {
  id: string;
  name_ko: string;
  name_en: string;
  slug: string;
  method_name: string | null;
  modality_name: string | null;
  content_status: string;
  updated_at: string | null;
  overview_ko: string | null;
  expected_effects_ko: string | null;
  mechanism_ko: string | null;
  procedure_ko: string | null;
  duration_ko: string | null;
  pain_downtime_ko: string | null;
  results_timeline_ko: string | null;
  best_for_ko: string | null;
  limitations_ko: string | null;
  risks_ko: string | null;
  device_market_intel_ko: string | null;
  global_market_intel_ko: string | null;
  korea_market_intel_ko: string | null;
  comparison_guide_ko: string | null;
  founder_take_ko: string | null;
  source: "supabase" | "demo";
};

export type TreatmentNavItem = {
  slug: string;
  name_ko: string;
  name_en: string;
};
