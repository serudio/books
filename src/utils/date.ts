/** Formats an ISO date (YYYY-MM-DD) for display; returns null if unusable. */
export function formatDate(isoDate: string | null | undefined) {
  if (!isoDate) return null;

  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
