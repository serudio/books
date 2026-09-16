import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { supabase } from "../supabase";
import { isAdminEmail } from "./admin";

/** Set just before leaving for Google, so we can reopen the panel on return. */
const RETURN_KEY = "books:admin-return";

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(Boolean(supabase));

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setLoading(false);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return {
    session,
    loading,
    email: session?.user.email,
    isAdmin: isAdminEmail(session?.user.email),
  };
}

export async function signInWithGoogle() {
  if (!supabase) throw new Error("Supabase is not configured");

  sessionStorage.setItem(RETURN_KEY, "1");

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      // No hash here: Supabase appends ?code=… to this URL on the way back.
      redirectTo: `${window.location.origin}${import.meta.env.BASE_URL}`,
    },
  });

  if (error) {
    sessionStorage.removeItem(RETURN_KEY);
    throw error;
  }
}

export async function signOut() {
  await supabase?.auth.signOut();
}

/** True once per return trip from Google, so App can restore the #admin view. */
export function consumeAdminReturn() {
  const pending = sessionStorage.getItem(RETURN_KEY) === "1";
  if (pending) sessionStorage.removeItem(RETURN_KEY);
  return pending;
}
