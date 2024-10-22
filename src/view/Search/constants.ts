import { Formats } from "../../components/book/types";
import { FilterContentProps } from "../../components/filters/types";

export const filtersWithInitialState: FilterContentProps = {
  price: {
    title: 'Preço',
    items: [
      {
        id: 1,
        label: 'de R$0 até R$30',
        rangeValue: {
          min: 0,
          max: 30,
        },
      },
      {
        id: 2,
        label: 'de R$31 até R$50',
        rangeValue: {
          min: 31,
          max: 50,
        },
      },
      {
        id: 3,
        label: 'de R$51 até R$100',
        rangeValue: {
          min: 51,
          max: 100,
        },
      },
      {
        id: 4,
        label: 'Mais de R$100',
        rangeValue: {
          min: 100,
          max: 100,
        },
      },
    ],
  },
  availableItems: {
    title: 'Disponibilidade para venda',
    items: [
      {
        id: 5,
        label: 'Disponível',
        value: true,
      },
      {
        id: 6,
        label: 'Indisponível',
        value: false,
      },
    ],
  },
  availableFormats: {
    title: 'Formatos disponíveis',
    items: [
      {
        id: 7,
        label: 'EPUB',
        value: Formats.EPUB,
      },
      {
        id: 8,
        label: 'PDF',
        value: Formats.PDF,
      },
    ],
  },
};