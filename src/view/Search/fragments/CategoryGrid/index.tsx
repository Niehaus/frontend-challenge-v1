import { useNavigate } from "react-router-dom";
import { Book } from "../../../../components/book/types";
import {
  CategorizedBooksContainer,
  CategoryTitle,
  ContentResults,
  ContentResultsCategory,
  ContentResultsCover,
  ContentResultsTitle,
  ContentResultsWrapper,
} from "./styles";

type CategoryGridProps = {
  categorizedBooks: Record<string, Book[]>;
};

const CategoryGrid: React.FC<CategoryGridProps> = ({ categorizedBooks }) => {
  const navigate = useNavigate();

  return (
    <CategorizedBooksContainer>
      {Object.keys(categorizedBooks).map((category) => (
        <>
          <CategoryTitle>{category}</CategoryTitle>
          <ContentResults>
            {categorizedBooks[category].map(({ id, volumeInfo: book }) => (
              <>
                <ContentResultsWrapper
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
              </>
            ))}
          </ContentResults>
        </>
      ))}
    </CategorizedBooksContainer>
  );
};

export default CategoryGrid;
