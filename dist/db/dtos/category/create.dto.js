import { z } from "zod";
export const CreateCategoryRequestDTO = z
    .object({
    type: z.string(),
})
    .strict();
//# sourceMappingURL=create.dto.js.map