import { z } from "zod";
export const PatchProductRequestDTO = z.object({
    CategoryId: z.number(),
});
export const PatchProductResponseDTO = z.object({
    id: z.number(),
    title: z.string(),
    price: z.string(),
    stock: z.number(),
    CategoryId: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
});
//# sourceMappingURL=patch.dto.js.map