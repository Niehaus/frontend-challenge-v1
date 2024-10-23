import { describe, it, expect } from "vitest";
import { FilterType } from "../../../../components/filters/types";
import { filter } from "../filter";
import { mockBookForSale, mockBookNotForSale } from "./constants";

describe("applyPriceFilter", () => {
  it("deve retornar true quando não há filtros de preço aplicados", () => {
    const result = filter([mockBookForSale], []);
    expect(result).toEqual([mockBookForSale]);
  });

  it.each([
    {
      priceFilter: {
        id: 1,
        label: "de R$10 até R$30",
        rangeValue: { min: 10, max: 30 },
      },
      expected: [mockBookForSale],
      description:
        "deve retornar true se o preço do livro estiver dentro do intervalo",
    },
    {
      priceFilter: {
        id: 1,
        label: "de R$30 até R$50",
        rangeValue: { min: 30, max: 50 },
      },
      expected: [],
      description:
        "deve retornar false se o preço do livro estiver fora do intervalo",
    },
  ])("$description", ({ priceFilter, expected }) => {
    const result = filter(
      [mockBookForSale],
      [{ ...priceFilter, filterType: FilterType.PRICE }]
    );
    expect(result).toEqual(expected);
  });
});

describe("applyAvailableItemsFilter", () => {
  it("deve retornar true quando não há filtros de itens disponíveis aplicados", () => {
    const result = filter([mockBookForSale], []);
    expect(result).toEqual([mockBookForSale]);
  });

  describe("applyAvailableFormatsFilter", () => {
    it("deve retornar true quando não há filtros de formato aplicados", () => {
      const result = filter([mockBookForSale], []);
      expect(result).toEqual([mockBookForSale]);
    });

    it.each([
      {
        formatsFilter: {
          id: 1,
          label: "Disponível",
          value: true,
        },
        expected: [mockBookForSale],
        description:
          "deve retornar true se o livro estiver disponível para venda",
      },
      {
        formatsFilter: {
          id: 2,
          label: "Indisponível",
          value: false,
        },
        expected: [],
        description:
          "deve retornar false se o livro não estiver disponível para venda",
      },
    ])("$description", ({ formatsFilter, expected }) => {
      const result = filter(
        [mockBookForSale],
        [{ filterType: FilterType.AVAILABLE_ITEMS, ...formatsFilter }]
      );
      expect(result).toEqual(expected);
    });
  });
});

describe("applyAvailableFormatsFilter", () => {
  it("deve retornar true quando não há filtros de formato aplicados", () => {
    const result = filter([mockBookForSale], []);
    expect(result).toEqual([mockBookForSale]);
  });

  it.each([
    {
      formatsFilter: {
        filterType: FilterType.AVAILABLE_FORMATS,
        id: 1,
        label: "PDF",
        value: "pdf",
      },
      expected: [mockBookForSale],
      description:
        "deve retornar true se o livro estiver disponível no formato PDF",
    },
    {
      formatsFilter: {
        filterType: FilterType.AVAILABLE_FORMATS,
        id: 1,
        label: "EPUB",
        value: "epub",
      },
      expected: [],
      description:
        "deve retornar false se o livro não estiver disponível no formato EPUB",
    },
  ])("$description", ({ formatsFilter, expected }) => {
    const result = filter([mockBookForSale], [formatsFilter]);
    expect(result).toEqual(expected);
  });
});

describe("filter", () => {
  it.each([
    {
      description: "deve filtrar livros com base em múltiplos critérios",
      books: [mockBookForSale, mockBookNotForSale],
      filters: [
        {
          filterType: FilterType.PRICE,
          rangeValue: { min: 10, max: 30 },
          id: 1,
          label: "",
        },
        {
          filterType: FilterType.AVAILABLE_ITEMS,
          value: true,
          id: 2,
          label: "",
        },
        {
          filterType: FilterType.AVAILABLE_FORMATS,
          value: "pdf",
          id: 3,
          label: "",
        },
      ],
      expected: [mockBookForSale],
    },
    {
      description:
        "deve retornar todos os livros quando nenhum filtro for aplicado",
      books: [mockBookForSale, mockBookNotForSale],
      filters: [],
      expected: [mockBookForSale, mockBookNotForSale],
    },
    {
      description:
        "deve retornar nenhum livro quando os filtros excluírem todos os livros",
      books: [mockBookForSale, mockBookNotForSale],
      filters: [
        {
          filterType: FilterType.PRICE,
          rangeValue: { min: 100, max: 200 },
          id: 1,
          label: "",
        },
      ],
      expected: [],
    },
  ])("$description", ({ books, filters, expected }) => {
    const result = filter(books, filters);
    expect(result).toEqual(expected);
  });
});
