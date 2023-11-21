import { z } from "zod";

export const CreateProductRequestDTO = z
	.object({
		title: z.string().trim(),
		price: z.number(),
		stock: z.number(),
		CategoryId: z.number(),
	})
	.strict();

export type CreateProductRequestDtoType = z.infer<typeof CreateProductRequestDTO>;

export const CreateProductResponseDTO = z
	.object({
		id: z.number(),
		title: z.string(),
		price: z.string(),
		stock: z.number(),
		CategoryId: z.number(),
        createdAt: z.date(),
        updatedAt: z.date(),
	})
	.strict();

export type CreateProductResponseDtoType = z.infer<typeof CreateProductResponseDTO>;

