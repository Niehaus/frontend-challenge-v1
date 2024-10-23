import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Search from "../index"; // Importe o componente correto
import useFetch from "../../../hooks/fetch/useFetch"; // Importe a função customizada
import "@testing-library/jest-dom";
import { BookSearchApi } from "../../book/types";

// Mock da função useFetch
vi.mock("../../../hooks/fetch/useFetch");

// Mock da função useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  Link: vi.fn(),
  useNavigate: () => mockNavigate,
}));

describe("Autocomplete Search", () => {
  const mockBookData = {
    items: [
      {
        id: "1",
        volumeInfo: {
          title: "Test Book 1",
          description: "Description of Test Book 1",
          authors: ["Author 1"],
          imageLinks: {
            smallThumbnail: "https://example.com/image1.jpg",
            thumbnail: "https://example.com/image1-large.jpg",
          },
          averageRating: 4.5,
          categories: ["Category 1"],
        },
        saleInfo: {
          retailPrice: {
            amount: 19.99,
            currencyCode: "USD",
          },
          isEbook: true,
          saleability: "FOR_SALE",
        },
        accessInfo: {
          epub: {
            isAvailable: true,
          },
          pdf: {
            isAvailable: false,
          },
        },
      },
    ],
    kind: "books#volumes",
    totalItems: 1,
  };

  it("deve abrir o overlay ao clicar no InputSearch", () => {
    vi.mocked(useFetch).mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });

    // Renderiza o componente antes de cada teste
    render(<Search />);
    // Encontra o input de pesquisa
    const inputSearch = screen.getByPlaceholderText("Pesquisar...");

    // Simula o clique no input de pesquisa para abrir o overlay
    fireEvent.click(inputSearch);

    const overlay = screen.getByTestId("searchOverlay"); // Use um `data-testid` ou um seletor único
    expect(overlay).toBeInTheDocument();
  });

  it("deve fechar o overlay ao clicar fora do InputSearch", () => {
    vi.mocked(useFetch).mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });

    // Renderiza o componente antes de cada teste
    render(<Search />);
    // Encontra o input de pesquisa
    const inputSearch = screen.getByPlaceholderText("Pesquisar...");

    // Simula o clique no input de pesquisa para abrir o overlay
    fireEvent.click(inputSearch);

    const overlay = screen.getByTestId("searchOverlay"); // Use um `data-testid` ou um seletor único
    expect(overlay).toBeInTheDocument();

    // Simula um clique fora do InputSearch
    fireEvent.mouseDown(document.body); // Clica fora do input
    expect(overlay).not.toBeInTheDocument();
  });

  it("deve fechar o overlay ao pressionar a tecla 'Tab'", () => {
    vi.mocked(useFetch).mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });

    // Renderiza o componente antes de cada teste
    render(<Search />);
    // Encontra o input de pesquisa
    const inputSearch = screen.getByPlaceholderText("Pesquisar...");

    // Simula o clique no input de pesquisa para abrir o overlay
    fireEvent.click(inputSearch);

    // Verifica se o overlay está inicialmente presente
    const overlay = screen.getByTestId("searchOverlay");
    expect(overlay).toBeInTheDocument();

    // Encontra o input de pesquisa e simula o foco
    inputSearch.focus(); // Foca no input de pesquisa

    // Simula a pressão da tecla 'Tab'
    fireEvent.keyDown(inputSearch, { key: "Tab", code: "Tab" });

    // Verifica se o overlay não está mais no documento
    const updatedOverlay = screen.queryByTestId("searchOverlay");
    expect(updatedOverlay).not.toBeInTheDocument();
  });

  it("deve exibir a mensagem 'Loading...' durante o carregamento", () => {
    // Mocka a função useFetch para retornar sem itens
    (useFetch as any).mockReturnValue({
      data: { items: [] },
      loading: true,
      error: null,
    });

    // Renderiza o componente antes de cada teste
    render(<Search />);

    // Encontra o input de pesquisa
    const inputSearch = screen.getByPlaceholderText("Pesquisar...");

    // Simula o clique no input de pesquisa para abrir o overlay
    fireEvent.click(inputSearch);

    const loadingElement = screen.getByText("Loading...");
    expect(loadingElement).toBeInTheDocument();
  });
  // Definir os diferentes estados a serem testados
  it.each([
    { loading: true, data: null, error: null, expected: "Loading..." },
    {
      loading: false,
      data: { items: [] },
      error: null,
      expected: "Nenhum resultado encontrado.",
    },
    {
      loading: false,
      data: { items: [{ id: "1", volumeInfo: { title: "Book 1" } }] },
      error: null,
      expected: "Book 1",
    },
    {
      loading: false,
      data: null,
      error: true,
      expected: "Erro ao buscar resultados.",
    },
  ])(
    "renderiza corretamente $expected quando loading=$loading, error=$error",
    ({ loading, data, error, expected }) => {
      // Mocka a função useFetch para retornar sem itens
      (useFetch as any).mockReturnValue({
        data,
        loading,
        error,
      });

      // Renderiza o componente antes de cada teste
      render(<Search />);

      // Encontra o input de pesquisa
      const inputSearch = screen.getByPlaceholderText("Pesquisar...");

      // Simula o clique no input de pesquisa para abrir o overlay
      fireEvent.click(inputSearch);

      const result = screen.getByText(expected);
      expect(result).toBeInTheDocument();
    }
  );

  it("deve renderizar resultados da pesquisa quando a API retorna dados", async () => {
    // Mocka a função useFetch para retornar dados de sucesso
    (useFetch as any).mockReturnValue({
      data: mockBookData,
      loading: false,
      error: null,
    });

    // Renderiza o componente antes de cada teste
    render(<Search />);

    // Encontra o input de pesquisa
    const inputSearch = screen.getByPlaceholderText("Pesquisar...");

    // Simula o clique no input de pesquisa para abrir o overlay
    fireEvent.click(inputSearch);

    const bookTitle = await screen.findByText("Test Book 1");
    expect(bookTitle).toBeInTheDocument();

    const author = screen.getByText("Author 1");
    expect(author).toBeInTheDocument();

    const category = screen.getByText("Category 1");
    expect(category).toBeInTheDocument();
  });

  it("deve navegar para a página do livro ao clicar em um item", () => {
    // Mocka a função useFetch com dados de exemplo
    (useFetch as any).mockReturnValue({
      data: {
        items: [
          {
            id: "1",
            volumeInfo: {
              title: "Book Title 1",
              authors: ["Author 1"],
              imageLinks: { smallThumbnail: "url/to/image1" },
              categories: ["Category 1"],
            },
          },
        ],
      },
      loading: false,
      error: null,
    });

    // Renderiza o componente antes de cada teste
    render(<Search />);

    // Abre o overlay clicando no input de pesquisa
    const inputSearch = screen.getByPlaceholderText("Pesquisar...");
    fireEvent.click(inputSearch);
    // Encontra o item de resultado da pesquisa
    const item = screen.getByText("Book Title 1");

    // Simula um clique no item
    fireEvent.click(item);

    // Verifica se o mock de navigate foi chamado corretamente
    expect(mockNavigate).toHaveBeenCalledWith("book/1", {
      state: {
        title: "Book Title 1",
        authors: ["Author 1"],
        imageLinks: { smallThumbnail: "url/to/image1" },
        categories: ["Category 1"],
      },
    });
  });
});
