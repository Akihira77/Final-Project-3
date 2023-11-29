import { z } from "zod";

export const EditSPACategoryRequestDTO = z
	.object({
		sold_product_amount : z.number(),
	})
	.strict();

export type EditSPACategoryRequestDtoType = z.infer<typeof EditSPACategoryRequestDTO>;

export const editSPACategoryResponseDTO = z.object({
    sold_product_amount: z.number(),
});

export type editSPACategoryResponseDtoType = z.infer<typeof editSPACategoryResponseDTO>;
