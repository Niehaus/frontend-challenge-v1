import { useState, useEffect, useMemo } from "react";
import { debounce } from "./utils";

// Hook customizado para buscar dados de uma API qualquer
function useFetch<T, P>(url: string, queryParams: P, delay: number = 250) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para construir a URL com query params
  const buildUrlWithParams = (baseUrl: string, queryParams: P) => {
    const url = new URL(baseUrl);
    const searchParams = new URLSearchParams(
      queryParams as string | string[][]
    );
    url.search = searchParams.toString();
    return url.toString(); // Retorna a URL como string
  };

  // URL completa com query parameters
  const urlWithParams = buildUrlWithParams(url, queryParams);
  const fetchApi = (fetchUrl: string) => {
    {
      setLoading(true);
      fetch(fetchUrl)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Erro ao buscar dados");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  };

  const debouncedFetch = useMemo(
    () => debounce((fetchUrl) => fetchApi(fetchUrl), delay),
    [delay]
  );

  useEffect(() => {
    // Chama a função de fetch com debounce
    debouncedFetch(urlWithParams);
  }, [urlWithParams, debouncedFetch]);

  return { data, loading, error };
}

export default useFetch;
