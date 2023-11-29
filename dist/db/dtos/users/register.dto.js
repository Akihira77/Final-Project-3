import { z } from "zod";
import { Genders } from "../../models/user.model.js";
export const RegisterRequestDTO = z
    .object({
    full_name: z.string().trim(),
    password: z.string().trim().min(6).max(10),
    gender: z.enum(Genders),
    email: z.string().email(),
})
    .strict();
export const RegisterResponseDTO = z.object({
    user: z.object({
        id: z.number(),
        full_name: z.string(),
        email: z.string().email(),
        gender: z.string(),
        balance: z.string(),
        createdAt: z.date(),
    }),
});
//# sourceMappingURL=register.dto.js.map