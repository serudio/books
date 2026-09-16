import { useCallback, useEffect, useState } from "react";

import { fallbackBooks, type Book } from "../data/books";
import { isSupabaseConfigured } from "../supabase";
import { getBooks, mapBookRow } from "../utils/db/books";

export function useBooks() {
  const [books, setBooks] = useState<Book[]>(fallbackBooks);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!isSupabaseConfigured) return;

    setLoading(true);
    try {
      const { data, error: queryError } = await getBooks();
      if (queryError) setError(queryError.message);
      else if (data) {
        setBooks(data.map(mapBookRow));
        setError(null);
      }
    } catch (cause: unknown) {
      setError(cause instanceof Error ? cause.message : String(cause));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react/set-state-in-effect -- initial catalogue fetch
    void refresh();
  }, [refresh]);

  return {
    books,
    loading,
    error,
    refresh,
    usingFallback: !isSupabaseConfigured,
  };
}
