import { redirect } from "react-router";
import { supabase } from "@/integrations/supabase/client";

export async function requireUser() {
  const { data } = await supabase.auth.getUser();
  if (!data.user) throw redirect("/sign-in");
  return { user: data.user };
}
