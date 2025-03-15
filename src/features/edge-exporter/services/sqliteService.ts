import initSqlJs from "sql.js";
import wasm from "sql.js/dist/sql-wasm.wasm?url";
import { collectionItemSchema, collectionSchema } from "@/schemas";
import { toast } from "sonner";
import { Collection, CollectionItem, SqliteProcessResult } from "../types";

export const processSqliteFile = async (
    file: File
): Promise<SqliteProcessResult> => {
    try {
        const buffer = await file.arrayBuffer();
        const SQL = await initSqlJs({
            locateFile: () => wasm,
        });
        const db = new SQL.Database(new Uint8Array(buffer));

        const collectionsQuery = `
      SELECT id, title, date_created AS createdAt, date_modified AS updatedAt
      FROM collections
    `;

        const itemsQuery = `
      SELECT 
        i.id, i.title, 
        CASE 
            WHEN i.canonical_image_url IS NOT NULL THEN i.canonical_image_url
            ELSE i.favicon_url
        END AS img,
        json_extract(i.source, '$.url') AS url,
        i.date_created AS createdAt,
        i.date_modified AS orderUpdatedAt,
        cir.parent_id AS collection_id
      FROM items i
      JOIN collections_items_relationship cir ON i.id = cir.item_id
    `;

        try {
            const collections =
                db.exec(collectionsQuery)[0]?.values.map((row) => ({
                    id: String(row[0]),
                    title: String(row[1]),
                    createdAt: Number(row[2]),
                    updatedAt: Number(row[3]),
                    orderUpdatedAt: Number(row[2]),
                    items: [] as CollectionItem[],
                })) || [];

            const items =
                db.exec(itemsQuery)[0]?.values.map((row) => ({
                    id: String(row[0]),
                    title: String(row[1]),
                    img: String(row[2]),
                    url: String(row[3]),
                    createdAt: Number(row[4]),
                    orderUpdatedAt: Number(row[5]),
                    collection_id: String(row[6]),
                })) || [];

            let errorCount = 0;
            const collectionMap = new Map<string, Collection>(
                collections.map((col) => [col.id, collectionSchema.parse(col)])
            );

            items.forEach((item) => {
                const collection = collectionMap.get(item.collection_id);
                if (collection) {
                    try {
                        collection.items.push(collectionItemSchema.parse(item));
                    } catch (error) {
                        console.error("Error parsing item:", error);
                        console.log("skipping item", item);
                        errorCount++;
                    }
                }
            });

            const result = Array.from(collectionMap.values());
            result.sort((a, b) => a.createdAt - b.createdAt);
            return {
                jsonData: JSON.stringify(result, null, 2),
                collectionsCount: collections.length,
                itemsCount: items.length,
                errorCount,
            };
        } catch (error) {
            console.error("Error executing SQL query:", error);
            toast.error(
                "Failed to extract data. Make sure this is a valid collections SQLite file."
            );
            return {
                jsonData: null,
                collectionsCount: 0,
                itemsCount: 0,
                errorCount: 0,
            };
        }
    } catch (error) {
        console.error("Error initializing SQL.js:", error);
        toast.error("Failed to process the SQLite file");
        return {
            jsonData: null,
            collectionsCount: 0,
            itemsCount: 0,
            errorCount: 0,
        };
    }
};
