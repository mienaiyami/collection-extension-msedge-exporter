import { Collection, CollectionItem } from "@/schemas";

export type SqliteProcessResult = {
    jsonData: string | null;
    collectionsCount: number;
    itemsCount: number;
    errorCount: number;
};

export type { Collection, CollectionItem };
