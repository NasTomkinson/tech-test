"use client";

import { useEffect, useState } from "react";

type UseFetchState<TData> = {
  data: TData | null;
  error: Error | null;
  loading: boolean;
};

export function useFetch<TData>(
  url: string | null,
): UseFetchState<TData> {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(Boolean(url));

  useEffect(() => {
    if (!url) {
      return;
    }

    const requestUrl = url;
    const controller = new AbortController();

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(requestUrl, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const responseData = (await response.json()) as TData;
        setData(responseData);
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === "AbortError") {
          return;
        }

        setError(
          requestError instanceof Error
            ? requestError
            : new Error("Unable to load data"),
        );
        setData(null);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => controller.abort();
  }, [url]);

  return { data, error, loading };
}
