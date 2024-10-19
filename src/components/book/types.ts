export type SearchProps = {
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

export type Book = {
    id: string;
    volumeInfo: VolumeInfo
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