import { FormattedTransactionDTO } from "./formatted.dto.js";
import { z } from "zod";
export const GetByIdResponseDTO = z.union([
    z.string(),
    FormattedTransactionDTO,
]);
//# sourceMappingURL=getById.dto.js.map