export type SearchProps = {
}
export enum Formats {
    'EPUB' = 'epub',
    'PDF' = 'pdf'
}

export enum Saleability {
    FOR_SALE = 'FOR_SALE',
    NOT_FOR_SALE = 'NOT_FOR_SALE'
}

export type VolumeInfo = {
    title: string
    description: string
    authors?: string[]
    imageLinks: {
        smallThumbnail: string
        thumbnail: string
    }
    averageRating?: number
    categories?: string[]
}

export type SaleInfo = {
    retailPrice: {
        amount: number,
        currencyCode: string;
    }
    isEbook: boolean;
    saleability: Saleability
}

type DefineAvailability = {
    isAvailable: boolean
}
export type AccessInfo = {
    epub: DefineAvailability
    pdf: DefineAvailability
}

export type Book = {
    id: string;
    volumeInfo: VolumeInfo
    saleInfo: SaleInfo
    accessInfo: AccessInfo
}

export type BookSearchApi = {
    items: Array<Book>;
    kind: string;
    totalItems: number;
}

export type BookSearchApiQueryParams = {
    q?: string;
    maxResults: number;
    startIndex?: number;
}