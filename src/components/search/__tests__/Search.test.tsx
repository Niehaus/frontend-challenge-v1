import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Search from "../index"; // Importe o componente correto
import useFetch from "../../../hooks/fetch/useFetch"; // Importe a função customizada
import "@testing-library/jest-dom";

// Mock da função useFetch
vi.mock("../../../hooks/fetch/useFetch");

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

  it("deve exibir a mensagem 'Nenhum resultado encontrado' quando não há resultados", async () => {
    // Mocka a função useFetch para retornar sem itens
    (useFetch as any).mockReturnValue({
      data: { items: [] },
      loading: false,
      error: null,
    });

    // Renderiza o componente antes de cada teste
    render(<Search />);

    // Encontra o input de pesquisa
    const inputSearch = screen.getByPlaceholderText("Pesquisar...");

    // Simula o clique no input de pesquisa para abrir o overlay
    fireEvent.click(inputSearch);

    const noResultsMessage = screen.getByTestId("resultsNotFound");
    expect(noResultsMessage).toBeInTheDocument();
  });

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
});
