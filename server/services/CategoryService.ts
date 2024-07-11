import Category from "../models/Category";

export async function getCategories(slug: string) {
  return await Category.find();
}
