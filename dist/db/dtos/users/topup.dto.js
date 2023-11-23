import { z } from "zod";
export const TopupRequestDTO = z
    .object({
    balance: z.number().min(0),
})
    .strict();
export const TopupResponseDTO = z.union([z.string(), z.number()]);
//# sourceMappingURL=topup.dto.js.map