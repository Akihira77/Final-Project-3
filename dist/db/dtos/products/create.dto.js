import { z } from "zod";
export const CreateProductRequestDTO = z
    .object({
    title: z.string().trim(),
    price: z.number(),
    stock: z.number(),
    CategoryId: z.number(),
})
    .strict();
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
//# sourceMappingURL=create.dto.js.map