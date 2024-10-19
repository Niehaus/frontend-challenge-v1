import { useLocation, useNavigate, useParams } from "react-router-dom";
import BookComponent from "../../components/book";
import { AdvancedSearch, ContentContainer, SubTitle } from "./styles";
import Separator from "../../components/separator";

const Book: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <ContentContainer>
        <BookComponent {...{ id: id ?? "", volumeInfo: location.state }} />
        <Separator />
        <AdvancedSearch onClick={() => navigate("/search")}>
          Busca Avançada
        </AdvancedSearch>
        <SubTitle>Livros semelhantes</SubTitle>
      </ContentContainer>
    </>
  );
};

export default Book;
