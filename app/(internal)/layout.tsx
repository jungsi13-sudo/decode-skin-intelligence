import { redirect } from "next/navigation";
import { hasSupabasePublicConfig } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

// Prevent static generation of internal content and verify auth again at render time.
export const dynamic = "force-dynamic";

export default async function InternalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  if (!hasSupabasePublicConfig()) redirect("/login");

  try {
    const supabase = await createClient();
    const { data: claimsData } = await supabase.auth.getClaims();

    if (!claimsData?.claims) redirect("/login");
  } catch {
    redirect("/login");
  }

  return children;
}
