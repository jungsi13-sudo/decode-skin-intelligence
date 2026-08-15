"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { hasSupabasePublicConfig } from "@/lib/supabase/config";

function safeNextPath(value: string | null) {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/";
}

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSigningInWithGoogle, setIsSigningInWithGoogle] = useState(false);
  const isConfigured = hasSupabasePublicConfig();
  const oauthError = searchParams.get("error") === "oauth";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isConfigured) return;

    setError(null);
    setIsSubmitting(true);
    const { error } = await createClient().auth.signInWithPassword({ email, password });
    setIsSubmitting(false);

    if (error) {
      setError("이메일 또는 비밀번호를 확인해 주세요.");
      return;
    }

    router.replace(safeNextPath(searchParams.get("next")));
    router.refresh();
  }

  async function handleGoogleSignIn() {
    if (!isConfigured) return;

    setError(null);
    setIsSigningInWithGoogle(true);
    const callbackUrl = new URL("/auth/callback", window.location.origin);
    callbackUrl.searchParams.set("next", safeNextPath(searchParams.get("next")));

    const { error } = await createClient().auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: callbackUrl.toString() },
    });

    if (error) {
      setIsSigningInWithGoogle(false);
      setError("Google 로그인을 시작할 수 없습니다. 잠시 후 다시 시도해 주세요.");
    }
  }

  return (
    <main className="loginShell">
      <section className="loginCard" aria-labelledby="login-title">
        <div className="loginBrand">decode.skin</div>
        <p className="loginEyebrow">INTERNAL INTELLIGENCE WIKI</p>
        <h1 id="login-title">Sign in</h1>
        <p className="loginIntro">승인된 사용자만 Internal Wiki에 접근할 수 있습니다.</p>

        {isConfigured ? (
          <>
            <form className="loginForm" onSubmit={handleSubmit}>
              <label>
                Email
                <input autoComplete="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
              </label>
              <label>
                Password
                <input autoComplete="current-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
              </label>
              {error || oauthError ? <p className="loginError" role="alert">{error ?? "Google 로그인을 완료할 수 없습니다. 다시 시도해 주세요."}</p> : null}
              <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Signing in…" : "Sign in"}</button>
            </form>
            <div className="loginDivider" aria-hidden="true"><span>or</span></div>
            <button className="googleButton" type="button" onClick={handleGoogleSignIn} disabled={isSigningInWithGoogle}>
              {isSigningInWithGoogle ? "Connecting to Google…" : "Continue with Google"}
            </button>
          </>
        ) : (
          <p className="loginError" role="alert">인증 환경 변수가 설정되지 않았습니다. 관리자에게 문의해 주세요.</p>
        )}
      </section>
    </main>
  );
}
