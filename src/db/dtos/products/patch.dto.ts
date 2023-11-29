import { z } from "zod";

export const PatchProductRequestDTO = z.object({
	CategoryId: z.number(),
});

export type PatchProductRequestDtoType = z.infer<typeof PatchProductRequestDTO>;

export const PatchProductResponseDTO = z.object({
	id: z.number(),
    title: z.string(),
    price: z.string(),
    stock: z.number(),
    CategoryId: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type PatchProductResponseDtoType = z.infer<typeof PatchProductResponseDTO>;

