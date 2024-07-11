export type Menu = {
	categories: MenuCategory[]
}

export type MenuCategory = {
	name: string
	items: MenuItem[]
}

export type MenuItem = {
	name: string
	image: string
	detail: string
	price: number
	rating: number
	uuid: string
}
