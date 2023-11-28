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
//# sourceMappingURL=getTransactionUser.dto.js.map