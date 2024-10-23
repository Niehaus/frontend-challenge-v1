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
import { books } from "./constants";
import { ShelvesProps } from "./types";

const Shelves: React.FC<ShelvesProps> = ({ shelves }) => {
  return (
    <Container>
      <Shelf>
        {Object.entries(shelves).map(([category, books]) => (
          <ContentList key={category}>
            <TitleCategory>{category}</TitleCategory>
            <Content>
              <Carousel settings={settings} spaceBetweenItems="16px">
                {books.map(({ volumeInfo }) => (
                  <ContentItem key={volumeInfo.title}>
                    <img
                      src={volumeInfo.imageLinks?.thumbnail}
                      alt={volumeInfo.title}
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
