import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  PropsWithChildren,
} from "react";
import useFetch from "../../hooks/fetch/useFetch";
import {
  BookSearchApi,
  BookSearchApiQueryParams,
} from "../../components/book/types";
import type { BooksContext } from "./types";
import { groupByCategory } from "../../utils";

// Criar o contexto com um valor inicial
const BooksContext = createContext<BooksContext | undefined>(undefined);

// Criar o Provider para envolver os componentes
export const BooksProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [term, setTerm] = useState<string>("Harry Potter");
  const [page, setPage] = useState<number>(0);

  const searchParams = useMemo<BookSearchApiQueryParams>(
    () => ({
      q: term,
      maxResults: 20,
      startIndex: page,
    }),
    [term, page]
  );

  const setData = (
    prevData: BookSearchApi | undefined,
    data: BookSearchApi
  ) => {
    if (!prevData?.items) return data;

    return {
      ...data,
      items: [...(prevData.items || []), ...(data.items || [])],
    };
  };

  const bookApi = "https://www.googleapis.com/books/v1/volumes";
  const { data, loading, error } = useFetch<
    BookSearchApi,
    BookSearchApiQueryParams
  >(bookApi, searchParams, setData);

  const searchBooks = (searchTerm: string, newPage: number) => {
    setTerm(searchTerm);
    setPage(newPage);
  };

  const groupedBooks = useMemo(
    () => groupByCategory(data?.items ?? []),
    [data]
  );

  const context = useMemo(
    () => ({ data, loading, error, groupedBooks, searchBooks }),
    [data, loading, error]
  );

  return (
    <BooksContext.Provider value={context}>{children}</BooksContext.Provider>
  );
};

// Hook para acessar o contexto
export const useBooksContext = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooksContext must be used within a BooksProvider");
  }
  return context;
};
