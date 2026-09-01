import { useEffect, useState } from "react";

import { fallbackBooks, type Book } from "../data/books";
import { isSupabaseConfigured } from "../supabase";
import { getBooks, mapBookRow } from "../utils/db/books";

export function useBooks() {
  const [books, setBooks] = useState<Book[]>(fallbackBooks);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    let cancelled = false;

    getBooks()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) setError(error.message);
        else if (data) setBooks(data.map(mapBookRow));
      })
      .catch((cause: unknown) => {
        if (!cancelled)
          setError(cause instanceof Error ? cause.message : String(cause));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { books, loading, error, usingFallback: !isSupabaseConfigured };
}
