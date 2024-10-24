import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header";
import {
  footerAllrightsReserved,
  helpLink,
  privacyAndPolicy,
  termsAndUsage,
} from "./constants";
import Home from "./view/Home";
import Search from "./view/Search";
import NoMatch from "./view/NoMatch";
import Book from "./view/Book";
import { RoutesContainer } from "./styles";
import { BooksProvider } from "./context/books";

function App() {
  return (
    <>
      <BooksProvider>
        <Header />
        <RoutesContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="book/:id" element={<Book />} />
            {/* Using path="*"" means "match anything", so this route
        acts like a catch-all for URLs that we don't have explicit
        routes for. */}
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </RoutesContainer>
      </BooksProvider>
      <Footer
        text={footerAllrightsReserved}
        privacyText={privacyAndPolicy}
        termsAndUsageText={termsAndUsage}
        helpText={helpLink}
      />
    </>
  );
}

export default App;
