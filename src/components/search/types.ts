export type SearchProps = {
}

type VolumeInfo = {
    title: string
    description: string
    imageLinks: {
        smallThumbnail: string
        thumbnail: string
    }
    averageRating?: number
    categories?: Array<String>
}

type Book = {
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