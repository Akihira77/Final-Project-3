import { z } from "zod";

export const TopupRequestDTO = z
	.object({
		balance: z.number().min(0),
	})
	.strict();

export type TopupRequestDtoType = z.infer<typeof TopupRequestDTO>;

export const TopupResponseDTO = z.union([z.string(), z.number()]);

export type TopupResponseDtoType = z.infer<typeof TopupResponseDTO>;
