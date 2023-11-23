import { z } from "zod";
export const EditCategoryRequestDTO = z
    .object({
    type: z.string(),
})
    .strict();
//# sourceMappingURL=edit.dto.js.map