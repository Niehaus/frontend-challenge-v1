import { Book, Saleability } from "../../../../components/book/types";

export const mockBookForSale: Book = {
    saleInfo: {
        saleability: Saleability.FOR_SALE,
        retailPrice: {
            amount: 25,
            currencyCode: "",
        },
        isEbook: false,
    },
    accessInfo: {
        pdf: { isAvailable: true },
        epub: { isAvailable: false },
    },
    volumeInfo: {
        title: "Sample Book",
        description: "",
        imageLinks: {
            smallThumbnail: "",
            thumbnail: "",
        },
    },
    id: "",
};

export const mockBookNotForSale: Book = {
    saleInfo: {
        saleability: Saleability.NOT_FOR_SALE,
        retailPrice: {
            amount: 0,
            currencyCode: "",
        },
        isEbook: false,
    },
    accessInfo: {
        pdf: { isAvailable: false },
        epub: { isAvailable: false },
    },
    volumeInfo: {
        title: "Unavailable Book",
        description: "",
        imageLinks: {
            smallThumbnail: "",
            thumbnail: "",
        },
    },
    id: "",
};