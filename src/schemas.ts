import { z } from "zod";
import { type UUID } from "crypto";

export const collectionItemSchema = z.object({
    title: z.string(),
    url: z.string().url(),
    img: z.string(),
    id: z.string().uuid() as z.ZodType<UUID>,
    createdAt: z.number(),
    orderUpdatedAt: z.number(),
});
export const collectionSchema = z.object({
    id: z.string().uuid() as z.ZodType<UUID>,
    title: z.string(),
    items: z.array(collectionItemSchema),
    createdAt: z.number(),
    updatedAt: z.number(),
    orderUpdatedAt: z.number(),
});

export type Collection = z.infer<typeof collectionSchema>;
export type CollectionItem = z.infer<typeof collectionItemSchema>;
