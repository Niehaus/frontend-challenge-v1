import { Book, BookSearchApi } from "../../components/book/types";

export type BooksContext = {
    data: BookSearchApi | undefined;
    loading: boolean;
    error: any;
    searchBooks: (term: string, page: number) => void;
    groupedBooks: Record<string, Book[]>
};