import React from "react";
import { VolumeInfo } from "../../../book/types";
import { Item, ItemContent, ItemImg } from "./styles";
import { CategoriesWrapper, CategoryTag, RatingTag, TitleWrapper } from "../../../book/styles";

type SearchResultItemProps = {
  id: string;
  volumeInfo: VolumeInfo;
  onClick: () => void;
};

const SearchResultItem: React.FC<SearchResultItemProps> = ({
  id,
  volumeInfo,
  onClick,
}) => {
  return (
    <Item key={id} onClick={onClick}>
      <ItemImg>
        <img
          width={"100%"}
          src={volumeInfo.imageLinks?.smallThumbnail}
          alt={volumeInfo.title}
        />
      </ItemImg>
      <ItemContent>
        <TitleWrapper>
          {volumeInfo.title}
          {volumeInfo.averageRating && (
            <RatingTag
              style={{
                backgroundColor:
                  volumeInfo.averageRating >= 3 ? "#EDCD1A" : "#EDB669",
              }}
            >
              {volumeInfo.averageRating}
            </RatingTag>
          )}
        </TitleWrapper>
        {volumeInfo.authors?.join(",")}
        <CategoriesWrapper>
          {volumeInfo.categories?.map((category, i) => (
            <CategoryTag key={i}>{category}</CategoryTag>
          ))}
        </CategoriesWrapper>
      </ItemContent>
    </Item>
  );
};

export default SearchResultItem;
