import { z } from "zod";
export const EditProductRequestDTO = z.object({
    title: z.string().trim(),
    price: z.number(),
    stock: z.number(),
});
export const EditProductResponseDTO = z.object({
    id: z.number(),
    title: z.string(),
    price: z.string(),
    stock: z.number(),
    CategoryId: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
});
//# sourceMappingURL=edit.dto.js.map