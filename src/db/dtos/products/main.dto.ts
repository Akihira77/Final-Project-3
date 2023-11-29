import { z } from "zod";
import CategoryModel from "../../models/category.model.js";

export const ProductDTO = z.object({
	id: z.number(),
	title: z.string(),
	price: z.string(),
	stock: z.number(),
	CategoryId: z.number(),
	Category: z.instanceof(CategoryModel),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type ProductDtoType = z.infer<typeof ProductDTO>;
