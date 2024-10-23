import React from "react";
import {
  Container,
  Content,
  ContentItem,
  ContentList,
  Shelf,
  TitleCategory,
} from "./styles";
import { settings } from "../carousel/constants";
import Carousel from "../carousel";
import { ShelvesProps } from "./types";
import { useNavigate } from "react-router-dom";

const Shelves: React.FC<ShelvesProps> = ({ shelves }) => {
  const navigate = useNavigate();
  
  return (
    <Container>
      <Shelf>
        {Object.entries(shelves).map(([category, books]) => (
          <ContentList key={category}>
            <TitleCategory>{category}</TitleCategory>
            <Content>
              <Carousel settings={settings} spaceBetweenItems="16px">
                {books.map(({id, volumeInfo: book }) => (
                  <ContentItem
                    key={book.title}
                    onClick={() => navigate("/book/" + id, { state: book })}
                  >
                    <img
                      src={book.imageLinks?.thumbnail}
                      alt={book.title}
                    />
                  </ContentItem>
                ))}
              </Carousel>
            </Content>
          </ContentList>
        ))}
      </Shelf>
    </Container>
  );
};

export default Shelves;
