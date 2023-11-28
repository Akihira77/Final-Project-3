import { z } from "zod";
export const EditSPACategoryRequestDTO = z
    .object({
    sold_product_amount: z.number(),
})
    .strict();
export const editSPACategoryResponseDTO = z.object({
    sold_product_amount: z.number(),
});
//# sourceMappingURL=editSPA.dto.js.map