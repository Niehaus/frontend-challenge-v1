import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  InputSearch,
  OverlaySearchContainer,
  OverlaySearchResultContainer,
  OverlaySearchResultEmpty,
  SearchContainer,
} from "./styles";
import { useOutsideClickCallback } from "../../hooks/useOutsideClickCallback";
import { useKeyHandlerCallback } from "../../hooks/useKeyHandlerCallback";
import useFetch from "../../hooks/fetch/useFetch";
import { useNavigate } from "react-router-dom";
import { BookSearchApiQueryParams, BookSearchApi } from "../book/types";
import { SearchProps } from "./types";
import SearchResultItem from "./fragments/item";

const Search: React.FC<SearchProps> = () => {
  const wrapperRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Referência ao contêiner de scroll

  const [term, setTerm] = useState("");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [showOverlay, setShowOverlay] = useState(false);

  const closeOverlay = () => setShowOverlay(false);
  // Handle Click and Tab key down
  useOutsideClickCallback(wrapperRef, closeOverlay);
  useKeyHandlerCallback(wrapperRef, closeOverlay, "Tab");

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
    setPage(0);
    setHasMore(true); // Reseta a variável hasMore
  };

  const searchParams = useMemo<BookSearchApiQueryParams>(
    () => ({
      q: term,
      maxResults: 10,
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

  // Função para detectar o scroll até o final do contêiner
  const handleScroll = () => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;

      // Verifica se o usuário rolou até o final do contêiner
      if (scrollTop + clientHeight >= scrollHeight && !loading) {
        if (hasMore) {
          setPage((prevPage) => prevPage + 11); // Incrementa a página se houver mais resultados
        }
      }
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);

      // Remove o event listener ao desmontar
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    if (data?.items && data?.items.length < 10) {
      setHasMore(false);
    }
  }, [data]);

  return (
    <SearchContainer ref={wrapperRef}>
      <InputSearch
        ref={inputRef}
        type="text"
        value={term}
        placeholder="Pesquisar..."
        onChange={handleChange}
        onClick={() => setShowOverlay(true)}
      />
      {/* <Icon /> */}
      {showOverlay && (
        <OverlaySearchContainer
          id="searchOverlay"
          data-testid="searchOverlay"
          ref={scrollContainerRef}
        >
          <OverlaySearchResultContainer id="searchResults">
            {loading && (
              <OverlaySearchResultEmpty>Loading...</OverlaySearchResultEmpty>
            )}
            {data?.items &&
              !loading &&
              data?.items.map((props, index) => (
                <SearchResultItem
                  {...props}
                  onClick={() =>
                    navigate("book/" + props.id, { state: props.volumeInfo })
                  }
                  key={index}
                />
              ))}

            {((!loading && (!data?.items || data.items.length === 0)) ||
              error && data?.items.length === 0) && (
              <OverlaySearchResultEmpty data-testid="resultsNotFound">
                {error
                  ? "Erro ao buscar resultados."
                  : "Nenhum resultado encontrado."}
              </OverlaySearchResultEmpty>
            )}
          </OverlaySearchResultContainer>
        </OverlaySearchContainer>
      )}
    </SearchContainer>
  );
};

export default Search;
