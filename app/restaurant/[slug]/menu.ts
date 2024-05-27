export type MenuItem = {
  name: string;
  image: string;
  info: string;
  price: string;
  rating: string;
};

export type MenuCategory = {
  name: string;
  items: MenuItem[];
};

export type Menu = {
  slug: string;
  categories: MenuCategory[];
};
