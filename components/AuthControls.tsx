"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthControls() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function signOut() {
    setIsSigningOut(true);
    await createClient().auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <div className="authControls">
      <span>Internal access</span>
      <button type="button" onClick={signOut} disabled={isSigningOut}>{isSigningOut ? "Signing out…" : "Sign out"}</button>
    </div>
  );
}
