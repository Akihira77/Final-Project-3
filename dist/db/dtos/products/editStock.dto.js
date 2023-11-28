import { z } from "zod";
export const editStockProductRequestDTO = z.object({
    stock: z.number(),
});
export const editStockProductResponseDTO = z.object({
    stock: z.number(),
});
//# sourceMappingURL=editStock.dto.js.map