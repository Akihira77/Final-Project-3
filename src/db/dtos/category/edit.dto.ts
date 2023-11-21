import { z } from "zod";

export const EditCategoryRequestDTO = z
	.object({
		type: z.string(),
	})
	.strict();

export type EditCategoryRequestDtoType = z.infer<typeof EditCategoryRequestDTO>;
