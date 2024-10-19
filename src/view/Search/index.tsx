import React from "react";
import Filters from "../../components/filters";
import {
  Container,
  Content,
  ContentResults,
  ContentResultsCategory,
  ContentResultsCover,
  ContentResultsTitle,
  ContentResultsWrapper,
} from "./styles";
import { books } from "../../components/shelves/constants";

const Search: React.FC = () => {
  return (
    <Container>
      <Content>
        <Filters />
        <ContentResults>
          {books.map((shelf) => (
            <>
              {shelf.booksShelf.map((book) => (
                <ContentResultsWrapper>
                  <ContentResultsCover>
                    <img src={book.urlImage} alt={book.slug} />
                  </ContentResultsCover>
                  <ContentResultsTitle>
                    <label>{book.title} </label>
                  </ContentResultsTitle>
                  <ContentResultsCategory>
                    <span>{book.autor}</span>
                  </ContentResultsCategory>
                </ContentResultsWrapper>
              ))}
            </>
          ))}
        </ContentResults>
      </Content>
    </Container>
  );
};

export default Search;
