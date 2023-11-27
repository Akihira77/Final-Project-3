import { z } from "zod";

export const editStockProductRequestDTO = z.object({
	stock: z.number(),
});

export type editStockProductRequestDtoType = z.infer<typeof editStockProductRequestDTO>;

export const editStockProductResponseDTO = z.object({
    stock: z.number(),
});

export type editStockProductResponseDtoType = z.infer<typeof editStockProductResponseDTO>;

