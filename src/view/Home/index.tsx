import Shelves from "../../components/shelves";
import { useBooksContext } from "../../context/books";

const Home: React.FC = () => {
  const { groupedBooks } = useBooksContext();

  return (
    <>
      <Shelves shelves={groupedBooks} />
    </>
  );
};

export default Home;
