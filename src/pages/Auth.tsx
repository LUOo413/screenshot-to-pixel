import { useNavigate, Link } from "react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteHeader } from "@/components/SiteHeader";
import { usePageMeta } from "@/lib/page-meta";

type Mode = "signin" | "signup";

export default function AuthPage({ mode }: { mode: Mode }) {
  usePageMeta({
    title: "Sign in — Video Speed Reader",
    description: "Sign in or create your Video Speed Reader account.",
    ogTitle: "Sign in — Video Speed Reader",
    ogDescription: "Sign in or create your Video Speed Reader account.",
    twitterCard: "summary",
  });

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate("/app", { replace: true });
    });
  }, [navigate]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } =
      mode === "signup"
        ? await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: window.location.origin },
          })
        : await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setError(error.message);
    navigate("/app", { replace: true });
  }

  const isSignup = mode === "signup";

  return (
    <div className="flex min-h-screen flex-col bg-gradient-hero">
      <SiteHeader right={<span />} />
      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-glow">
          <h1 className="text-2xl font-bold">{isSignup ? "Create account / 註冊" : "Sign in / 登入"}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isSignup ? "Start turning videos into transcripts." : "Welcome back."}
          </p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                autoComplete={isSignup ? "new-password" : "current-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" variant="hero" className="w-full" disabled={loading}>
              {loading ? "Please wait…" : isSignup ? "Sign up" : "Sign in"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isSignup ? "Already have an account?" : "No account yet?"}{" "}
            <button type="button" className="font-medium text-primary-glow hover:underline" onClick={() => { navigate(isSignup ? "/sign-in" : "/sign-up"); setError(null); }}>
              {isSignup ? "Sign in" : "Sign up"}
            </button>
          </p>
          <p className="mt-2 text-center text-xs">
            <Link to="/" className="text-muted-foreground hover:text-foreground">← Back home</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
