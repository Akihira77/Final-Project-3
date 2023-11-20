import { z } from "zod";

export const UpdateUserRequestDTO = z
	.object({
		full_name: z.string(),
		email: z.string().email(),
	})
	.strict();

export type UpdateUserRequestDtoType = z.infer<typeof UpdateUserRequestDTO>;

export const UpdateUserResponseDTO = z.object({
	user: z.object({
		id: z.number(),
		full_name: z.string(),
		email: z.string().email(),
		createdAt: z.date(),
		updatedAt: z.date(),
	}),
});

export type UpdateUserResponseDtoType = z.infer<typeof UpdateUserResponseDTO>;
