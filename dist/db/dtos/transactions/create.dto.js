import { z } from "zod";
export const CreateTransactionRequestDTO = z
    .object({
    ProductId: z.number(),
    quantity: z.number(),
})
    .strict();
export const CreateTransactionResponseDTO = z
    .object({
    total_price: z.string(),
    quantity: z.number(),
    productName: z.string(),
})
    .strict();
//# sourceMappingURL=create.dto.js.map