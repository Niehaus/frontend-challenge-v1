import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Filter from "../index";
import { FilterProps } from "../types";
import { filtersWithInitialState } from "./constants";

describe("Filter Component", () => {
  let mockOnChange: ReturnType<typeof vi.fn>;
  let mockResetFilters: ReturnType<typeof vi.fn>;
  let props: FilterProps;

  beforeEach(() => {
    mockOnChange = vi.fn();
    mockResetFilters = vi.fn();

    props = {
      mainTitle: "Filtrar Produtos",
      filters: filtersWithInitialState,
      resetFilters: mockResetFilters,
      onChange: mockOnChange,
    };

    render(<Filter {...props} />);
  });

  it("deve renderizar o título principal", () => {
    const mainTitle = screen.getByText("Filtrar Produtos");
    expect(mainTitle).toBeInTheDocument();
  });

  it("deve renderizar as categorias e seus itens", () => {
    expect(screen.getByText("Preço")).toBeInTheDocument();
    expect(screen.getByText("de R$0 até R$30")).toBeInTheDocument();

    expect(screen.getByText("Disponibilidade para venda")).toBeInTheDocument();
    expect(screen.getByText("Formatos disponíveis")).toBeInTheDocument();

    expect(screen.getByText("Disponível")).toBeInTheDocument();
    expect(screen.getByText("EPUB")).toBeInTheDocument();
  });

  it("deve marcar e desmarcar os filtros de preço corretamente", () => {
    const filterType = "price";
    const itemId = 1;
    const priceCheckbox = screen.getByTestId(filterType + itemId);

    fireEvent.click(priceCheckbox);
    expect(priceCheckbox).toBeChecked();

    expect(mockOnChange).toHaveBeenCalledWith([
      {
        id: itemId,
        label: "de R$0 até R$30",
        rangeValue: { min: 0, max: 30 },
        filterType,
      },
    ]);

    fireEvent.click(priceCheckbox);
    expect(priceCheckbox).not.toBeChecked();
    expect(mockOnChange).toHaveBeenCalledWith([]);
  });

  it("deve marcar e desmarcar os filtros de disponibilidade corretamente", () => {
    const filterType = "availableItems";
    const itemId = 5;
    const availableCheckbox = screen.getByTestId(filterType + itemId);

    fireEvent.click(availableCheckbox);
    expect(availableCheckbox).toBeChecked();

    expect(mockOnChange).toHaveBeenCalledWith([
      { id: itemId, label: "Disponível", value: true, filterType },
    ]);

    fireEvent.click(availableCheckbox);
    expect(availableCheckbox).not.toBeChecked();
    expect(mockOnChange).toHaveBeenCalledWith([]);
  });

  it("deve marcar e desmarcar os filtros de formato corretamente", () => {
    const filterType = "availableFormats";
    const itemId = 7;
    const formatCheckbox = screen.getByTestId(filterType + itemId);;

    fireEvent.click(formatCheckbox);
    expect(formatCheckbox).toBeChecked();

    expect(mockOnChange).toHaveBeenCalledWith([
      { id: itemId, label: "EPUB", value: "epub", filterType },
    ]);

    fireEvent.click(formatCheckbox);
    expect(formatCheckbox).not.toBeChecked();
    expect(mockOnChange).toHaveBeenCalledWith([]);
  });

  it("deve exibir o botão de limpar filtro quando há itens selecionados", () => {
    const filterType = "price";
    const itemId = 1;
    const priceCheckbox = screen.getByTestId(filterType + itemId);

    fireEvent.click(priceCheckbox);
    expect(priceCheckbox).toBeChecked();

    const clearButton = screen.getByText("Limpar Filtro");
    expect(clearButton).toBeInTheDocument();
  });

  it("deve resetar os filtros ao clicar no botão 'Limpar Filtro'", () => {
    const filterType = "price";
    const itemId = 1;
    const priceCheckbox = screen.getByTestId(filterType + itemId);
    fireEvent.click(priceCheckbox);

    const clearButton = screen.getByText("Limpar Filtro");
    fireEvent.click(clearButton);

    expect(mockResetFilters).toHaveBeenCalled();
    expect(priceCheckbox).not.toBeChecked();
  });
});
