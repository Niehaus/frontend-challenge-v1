import React, { useMemo, useState } from "react";
import BookFilter from "../../components/filters";
import { Content, LoadingContainer } from "./styles";
import {
  BookSearchApi,
  BookSearchApiQueryParams,
} from "../../components/book/types";
import useFetch from "../../hooks/fetch/useFetch";
import { groupByCategory } from "./utils";
import CategoryGrid from "./fragments/CategoryGrid";
import { FilterItem, FilterType } from "../../components/filters/types";
import { filter } from "./utils/filter";
import { filtersWithInitialState } from "./constants";

const Search: React.FC = () => {
  const [filters, setFilters] = useState<
    Array<FilterItem & { filterType?: FilterType | undefined }>
  >([]);
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

  const handleFilterChange = (
    filters: Array<FilterItem & { filterType?: FilterType | undefined }>
  ) => {
    setFilters(filters);
  };

  const resetFilters = () => {
    setFilters([]);
  };

  const categorizedBooks = useMemo(
    () => groupByCategory(filter(books?.items ?? [], filters)),
    [books, filters]
  );

  return (
    <Content>
      <BookFilter
        mainTitle="Filtros"
        filters={filtersWithInitialState}
        onChange={handleFilterChange}
        resetFilters={resetFilters}
      />
      {loading && <LoadingContainer>....Loading</LoadingContainer>}
      {!loading && !error && (
        <CategoryGrid categorizedBooks={categorizedBooks} />
      )}
    </Content>
  );
};

export default Search;
