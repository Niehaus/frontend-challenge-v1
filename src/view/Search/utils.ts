import { Book } from "../../components/book/types";

export const groupByCategory = (items: Book[]): Record<string, Book[]> => {
    return items.reduce<Record<string, Book[]>>((acc, item) => {
        if (item.volumeInfo.categories && item.volumeInfo.categories.length > 0) {
            item.volumeInfo.categories.forEach((category: string) => {
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push(item);
            });
        } else {
            if (!acc['Uncategorized']) {
                acc['Uncategorized'] = [];
            }
            acc['Uncategorized'].push(item);
        }

        return acc;
    }, {});
}