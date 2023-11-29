import { z } from "zod";

export const CreateCategoryRequestDTO = z
	.object({
		type: z.string(),
	})
	.strict();

export type CreateCategoryRequestDtoType = z.infer<
	typeof CreateCategoryRequestDTO
>;
