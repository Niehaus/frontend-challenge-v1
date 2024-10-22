import { Book, Saleability, AccessInfo } from "../../../components/book/types";
import { PriceFilterItem, FilterItem, FilterType } from "../../../components/filters/types";

const applyPriceFilter = (book: Book, priceFilters: PriceFilterItem[]): boolean => {
    if (priceFilters.length === 0) return true;

    return priceFilters.some(({ rangeValue }) =>
        book.saleInfo.saleability == Saleability.FOR_SALE &&
        book.saleInfo.retailPrice.amount >= rangeValue.min &&
        book.saleInfo.retailPrice.amount <= rangeValue.max
    );
};

const applyAvailableItemsFilter = (book: Book, availableItemsFilters: FilterItem[]): boolean => {
    if (availableItemsFilters.length === 0) return true;

    return availableItemsFilters.some(({ value }) => {
        const saleability = value ? Saleability.FOR_SALE : Saleability.NOT_FOR_SALE;
        return book.saleInfo.saleability == saleability
    });
};

const applyAvailableFormatsFilter = (book: Book, availableFormatsFilters: FilterItem[]): boolean => {
    if (availableFormatsFilters.length === 0) return true;

    return availableFormatsFilters.some(({ value }) =>
        book.accessInfo[value as keyof AccessInfo].isAvailable
    );
};

export const filter = (books: Book[], filters: Array<FilterItem & { filterType?: FilterType | undefined }>): Book[] => {
    if (filters.length === 0) return books;

    // Separação dos filtros pelos seus tipos Price, Available Items e Available Formats
    const priceFilters = filters.filter(f => f.filterType === FilterType.PRICE) as PriceFilterItem[];
    const availableItemsFilters = filters.filter(f => f.filterType === FilterType.AVAILABLE_ITEMS);
    const availableFormatsFilters = filters.filter(f => f.filterType === FilterType.AVAILABLE_FORMATS);

    // Aplicação dos filtros em uma iteração p/ que agora o array books não seja percorrido mais de uma vez
    return books.filter(book =>
        applyPriceFilter(book, priceFilters) &&
        applyAvailableItemsFilter(book, availableItemsFilters) &&
        applyAvailableFormatsFilter(book, availableFormatsFilters)
    );
};