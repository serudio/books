import { useCallback, useEffect, useState } from "react";

const readHash = () => window.location.hash.replace(/^#\/?/, "");

/** Minimal hash routing — GitHub Pages serves a single static file. */
export function useHashRoute() {
  const [route, setRoute] = useState(readHash);

  useEffect(() => {
    const onHashChange = () => setRoute(readHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = useCallback((next: string) => {
    window.location.hash = next;
    setRoute(next.replace(/^#\/?/, ""));
  }, []);

  return { route, navigate };
}
