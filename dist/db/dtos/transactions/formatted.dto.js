import { z } from "zod";
import UserModel from "../../models/user.model.js";
import { ProductDTO } from "../products/main.dto.js";
export const FormattedTransactionDTO = z.object({
    ProductId: z.number(),
    UserId: z.number(),
    quantity: z.number(),
    total_price: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    Product: z.optional(ProductDTO),
    User: z.optional(z.instanceof(UserModel)),
});
//# sourceMappingURL=formatted.dto.js.map