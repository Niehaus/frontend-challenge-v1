import { useNavigate } from "react-router-dom";
import { Book } from "../../../../components/book/types";
import {
  CategorizedBooksContainer,
  CategoryTitle,
  CategoryWrapper,
  ContentResults,
  ContentResultsCategory,
  ContentResultsCover,
  ContentResultsTitle,
  ContentResultsWrapper,
} from "./styles";
import { useMemo } from "react";

type CategoryGridProps = {
  categorizedBooks: Record<string, Book[]>;
};

const CategoryGrid: React.FC<CategoryGridProps> = ({ categorizedBooks }) => {
  const navigate = useNavigate();

  const categoryGrid = useMemo(
    () => Object.entries(categorizedBooks),
    [categorizedBooks]
  );

  return (
    <CategorizedBooksContainer>
      {categoryGrid.map(([category, books]) => (
        <CategoryWrapper key={category}>
          <CategoryTitle>{category}</CategoryTitle>
          <ContentResults>
            {books.map(({ id, volumeInfo: book }) => (
              <ContentResultsWrapper
                key={book.title}
                onClick={() => navigate("/book/" + id, { state: book })}
              >
                <ContentResultsCover>
                  <img src={book.imageLinks?.thumbnail} alt={book.title} />
                </ContentResultsCover>
                <ContentResultsTitle>
                  <label>{book.title} </label>
                </ContentResultsTitle>
                <ContentResultsCategory>
                  <span>{book.authors?.join(", ")}</span>
                </ContentResultsCategory>
              </ContentResultsWrapper>
            ))}
          </ContentResults>
        </CategoryWrapper>
      ))}

      {categoryGrid.length == 0 && <>A prateleira está vazia ):</>}
    </CategorizedBooksContainer>
  );
};

export default CategoryGrid;
