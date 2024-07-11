import Restaurant from "../models/Restaurant";

export async function getRestaurants() {
  return await Restaurant.find();
}

export async function getRestaurant(slug: string) {
  return await Restaurant.findOne({ slug: slug });
}
