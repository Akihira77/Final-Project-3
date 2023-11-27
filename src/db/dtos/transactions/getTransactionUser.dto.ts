import { z } from "zod";

export const GetTransactionResponseDTO = z
	.object({
        ProductId: z.number(),
        UserId: z.number(),
        quantity: z.number(),
		total_price: z.number(),
        createdAt: z.date(),
        updatedAt: z.date(),
	})
	.strict();

export type GetTransactionResponseDtoType = z.infer<typeof GetTransactionResponseDTO>;

