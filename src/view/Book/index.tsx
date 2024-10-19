import { useParams } from "react-router-dom";

const Book: React.FC = () => {
  const { id } = useParams();
  return <>Book {id}</>;
};

export default Book;
