import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// If env vars aren't set yet, we export `null` instead of throwing, so the
// rest of the site (which doesn't depend on Supabase) still renders and
// builds cleanly. Components that need Supabase check for this.
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export const isSupabaseConfigured = Boolean(supabase);

/**
 * Returns a stable anonymous visitor id, stored in localStorage.
 * No personal data is collected — this is just a random UUID used to
 * approximate "unique visitors" for the counter.
 */
export function getVisitorId(): string {
  if (typeof window === "undefined") return "server";
  const key = "anmol-portfolio-visitor-id";
  let id = window.localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(key, id);
  }
  return id;
}
