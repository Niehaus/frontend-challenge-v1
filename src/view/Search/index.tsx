import React, { useMemo } from "react";
import Filters from "../../components/filters";
import { Content, LoadingContainer } from "./styles";
import {
  BookSearchApi,
  BookSearchApiQueryParams,
} from "../../components/book/types";
import useFetch from "../../hooks/fetch/useFetch";
import { groupByCategory } from "./utils";
import CategoryGrid from "./fragments/CategoryGrid";
import { FilterItem } from "../../components/filters/types";

const Search: React.FC = () => {
  const bookApi = "https://www.googleapis.com/books/v1/volumes";
  const setBook = (_: any, book: BookSearchApi) => book;
  const searchParams = useMemo<BookSearchApiQueryParams>(
    () => ({
      q: "Harry Potter Star Wars",
      maxResults: 40,
      startIndex: Math.floor(Math.random() * 15),
    }),
    []
  );

  const {
    data: books,
    loading,
    error,
  } = useFetch<BookSearchApi, BookSearchApiQueryParams>(
    bookApi,
    searchParams,
    setBook
  );

  const categorizedBooks = useMemo(
    () => groupByCategory(books?.items ?? []),
    [books]
  );

  const handleFilterChange = (
    filters: Array<FilterItem & { filterType?: string | undefined }>
  ) => {
    console.log({ filters });
  };

  const resetFilters = () => {};

  return (
    <Content>
      <Filters
        mainTitle="Filtros"
        onChange={handleFilterChange}
        resetFilters={resetFilters}
        hasSelectedFilters={true}
      />
      {loading && <LoadingContainer>....Loading</LoadingContainer>}
      {!loading && !error && (
        <CategoryGrid categorizedBooks={categorizedBooks} />
      )}
    </Content>
  );
};

export default Search;
