import { Book, Saleability, AccessInfo } from "../../../components/book/types";
import { PriceFilterItem, FilterItem, FilterType } from "../../../components/filters/types";

const applyPriceFilter = (
    priceFilters: PriceFilterItem[],
    books: Book[]
): Book[] => {
    if (priceFilters.length == 0) return books;

    let filteredBooks: Book[] = [];
    priceFilters.forEach(({ rangeValue }) => {
        filteredBooks = [
            ...filteredBooks,
            ...books.filter(
                ({ saleInfo }) =>
                    saleInfo.saleability == Saleability.FOR_SALE && // Checks for a saleable book
                    saleInfo.retailPrice.amount >= rangeValue.min && // Checks for price above min range
                    saleInfo.retailPrice.amount <= rangeValue.max // Checks for price bellow max range
            ),
        ];
    });

    return filteredBooks;
};

const applyAvailableItemsFilter = (
    availableItemsFilter: FilterItem[],
    books: Book[]
): Book[] => {
    if (availableItemsFilter.length == 0) return books;

    let filteredBooks: Book[] = [];
    availableItemsFilter.forEach(({ value }) => {
        const saleability = value
            ? Saleability.FOR_SALE
            : Saleability.NOT_FOR_SALE;

        filteredBooks = [
            ...filteredBooks,
            ...books.filter(({ saleInfo }) => saleInfo.saleability == saleability),
        ];
    });

    return filteredBooks;
};

const applyAvailableFormatsFilter = (
    availaFormatsFilter: FilterItem[],
    books: Book[]
): Book[] => {
    if (availaFormatsFilter.length == 0) return books;

    let filteredBooks: Book[] = books;
    availaFormatsFilter.forEach(({ value }) => {
        const format = value as keyof AccessInfo;

        filteredBooks = [
            ...filteredBooks.filter(
                ({ accessInfo }) => accessInfo[format].isAvailable
            ),
        ];
    });

    return filteredBooks;
};

export const filter = (books: Book[], filters: Array<FilterItem & { filterType?: FilterType | undefined }>): Book[] => {
    if (filters.length == 0) return books;

    const price = filters.filter(
        (f) => f.filterType === FilterType.PRICE
    ) as PriceFilterItem[];

    const priceFiltered = applyPriceFilter(price, books);
    const availableItems = filters.filter(
        (f) => f.filterType === FilterType.AVAILABLE_ITEMS
    );

    const itemsFiltered = applyAvailableItemsFilter(
        availableItems,
        priceFiltered
    );

    const availableFormats = filters.filter(
        (f) => f.filterType === FilterType.AVAILABLE_FORMATS
    );

    const availableFormatsFilter = applyAvailableFormatsFilter(
        availableFormats,
        itemsFiltered
    );

    return availableFormatsFilter;
};