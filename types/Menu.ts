export type MenuItem = {
	name: string
	image: string
	detail: string
	price: string
	rating: string
	uuid: string
}

export type MenuCategory = {
	name: string
	items: MenuItem[]
}

export type Menu = {
	slug: string
	categories: MenuCategory[]
}
