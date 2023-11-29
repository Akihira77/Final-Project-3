import { z } from "zod";
export const LoginRequestDTO = z
    .object({
    email: z.string().email(),
    password: z.string().min(6).max(10),
})
    .strict();
export const LoginResponseDTO = z.union([
    z.string(),
    z.object({
        token: z.string(),
    }),
]);
//# sourceMappingURL=login.dto.js.map