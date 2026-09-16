/**
 * Mirrors public.is_admin() in supabase/migrations/0003_admin_write_access.sql.
 * This copy only drives the UI — the database is what actually enforces it.
 */
export const ADMIN_EMAIL = "cestserg@gmail.com";

export function isAdminEmail(email: string | undefined) {
  return email?.toLowerCase() === ADMIN_EMAIL;
}
