import Authors from "./fragments/authors";
import {
  BookContainer,
  ColumnContainer,
  DescriptionWrapper,
  RatingTag,
  Thumbnail,
  ThumbnailContent,
  TitleWrapper,
} from "./styles";
import type { Book as BookType } from "./types";

const Book: React.FC<BookType> = ({ volumeInfo }) => {
  const { title, description, averageRating, authors, imageLinks } = volumeInfo;
  return (
    <BookContainer>
      <ThumbnailContent>
        <Thumbnail src={imageLinks.thumbnail} />
      </ThumbnailContent>
      <ColumnContainer>
        <TitleWrapper>
          {title}
          {averageRating && (
            <RatingTag
              style={{
                backgroundColor: averageRating >= 3 ? "#EDCD1A" : "#EDB669",
              }}
            >
              {averageRating}
            </RatingTag>
          )}
        </TitleWrapper>
        <Authors authors={authors} />
        <DescriptionWrapper>{description}</DescriptionWrapper>
      </ColumnContainer>
    </BookContainer>
  );
};

export default Book;
