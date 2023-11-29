import { z } from "zod";

export const CreateTransactionRequestDTO = z
	.object({
		ProductId: z.number(),
		quantity: z.number(),
	})
	.strict();

export type CreateTransactionRequestDtoType = z.infer<
	typeof CreateTransactionRequestDTO
>;

export const CreateTransactionResponseDTO = z
	.object({
		total_price: z.string(),
		quantity: z.number(),
		product_name: z.string(),
	})
	.strict();

export type CreateTransactionResponseDtoType = z.infer<
	typeof CreateTransactionResponseDTO
>;
