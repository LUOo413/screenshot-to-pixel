import { useLoaderData, useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { usePageMeta } from "@/lib/page-meta";
import type { requireUser } from "@/lib/require-user";

export default function Dashboard() {
  usePageMeta({
    title: "Dashboard — Video Speed Reader",
    description: "Your Video Speed Reader dashboard.",
    ogTitle: "Dashboard — Video Speed Reader",
    ogDescription: "Your Video Speed Reader dashboard.",
    twitterCard: "summary",
  });

  const { user } = useLoaderData<typeof requireUser>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate("/sign-in", { replace: true });
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader right={<Button variant="outline" onClick={signOut}>Sign out / 登出</Button>} />
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Hi <span className="text-gradient break-all">{user.email}</span>
        </h1>
        <div className="mt-8 rounded-xl border border-dashed border-border bg-card p-10 text-muted-foreground">
          Your dashboard is coming soon. Upload functionality will be added in the next milestone.
        </div>
      </main>
    </div>
  );
}
