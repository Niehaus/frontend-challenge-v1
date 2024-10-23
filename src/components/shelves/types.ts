import { Book } from "../book/types"

export type ShelvesProps = {
    shelves: Record<string, Book[]>
}