import {Menu} from '@/types/Menu'

export function getRestaurants() {
	const restaurants = [
		{
			id: '0',
			name: "Dilara's Kitchen",
			rating: 3.6,
			slug: 'dilara-s-kitchen',
			favorite: true,
			image:
				'https://tb-static.uber.com/prod/image-proc/processed_images/bf8d432616cba7ebb227d460a48cc234/fb86662148be855d931b37d6c1e5fcbe.webp',
			deliveryTime: '40-50 min',
		},
		{
			id: '1',
			name: 'Omer Kokorec',
			slug: 'omer-kokorec',
			rating: 2.1,
			favorite: false,
			image:
				'https://tb-static.uber.com/prod/image-proc/processed_images/2c00740e5aef5ab971a70fddfdb9e07f/97e6648b3593c29cb4a6335f976e6d84.jpeg',
			deliveryTime: '10-20 min',
		},
		{
			id: '2',
			name: 'Yagmur Waffle',
			slug: 'yagmur-waffle',
			rating: 4.0,
			favorite: true,
			image:
				'https://tb-static.uber.com/prod/image-proc/processed_images/c07f5caf2384cafb87038f24dfd1d1d8/67b1ce06a25a64dc4a71581bb39c36c6.jpeg',
			deliveryTime: '30-40 min',
		},
		{
			id: '3',
			name: 'Amigos',
			slug: 'amigos',
			rating: 3.9,
			favorite: true,
			image:
				'https://tb-static.uber.com/prod/image-proc/processed_images/c07f5caf2384cafb87038f24dfd1d1d8/c9252e6c6cd289c588c3381bc77b1dfc.jpeg',
			deliveryTime: '20-30 min',
		},
		{
			id: '0',
			name: "Dilara's Kitchen",
			rating: 3.6,
			slug: 'dilara-s-kitchen',
			favorite: true,
			image:
				'https://tb-static.uber.com/prod/image-proc/processed_images/bf8d432616cba7ebb227d460a48cc234/fb86662148be855d931b37d6c1e5fcbe.webp',
			deliveryTime: '40-50 min',
		},
		{
			id: '1',
			name: 'Omer Kokorec',
			slug: 'omer-kokorec',
			rating: 2.1,
			favorite: false,
			image:
				'https://tb-static.uber.com/prod/image-proc/processed_images/2c00740e5aef5ab971a70fddfdb9e07f/97e6648b3593c29cb4a6335f976e6d84.jpeg',
			deliveryTime: '10-20 min',
		},
		{
			id: '2',
			name: 'Yagmur Waffle',
			slug: 'yagmur-waffle',
			rating: 4.0,
			favorite: true,
			image:
				'https://tb-static.uber.com/prod/image-proc/processed_images/c07f5caf2384cafb87038f24dfd1d1d8/67b1ce06a25a64dc4a71581bb39c36c6.jpeg',
			deliveryTime: '30-40 min',
		},
		{
			id: '3',
			name: 'Amigos',
			slug: 'amigos',
			rating: 3.9,
			favorite: true,
			image:
				'https://tb-static.uber.com/prod/image-proc/processed_images/c07f5caf2384cafb87038f24dfd1d1d8/c9252e6c6cd289c588c3381bc77b1dfc.jpeg',
			deliveryTime: '20-30 min',
		},
		{
			id: '0',
			name: "Dilara's Kitchen",
			rating: 3.6,
			slug: 'dilara-s-kitchen',
			favorite: true,
			image:
				'https://tb-static.uber.com/prod/image-proc/processed_images/bf8d432616cba7ebb227d460a48cc234/fb86662148be855d931b37d6c1e5fcbe.webp',
			deliveryTime: '40-50 min',
		},
		{
			id: '1',
			name: 'Omer Kokorec',
			slug: 'omer-kokorec',
			rating: 2.1,
			favorite: false,
			image:
				'https://tb-static.uber.com/prod/image-proc/processed_images/2c00740e5aef5ab971a70fddfdb9e07f/97e6648b3593c29cb4a6335f976e6d84.jpeg',
			deliveryTime: '10-20 min',
		},
		{
			id: '2',
			name: 'Yagmur Waffle',
			slug: 'yagmur-waffle',
			rating: 4.0,
			favorite: true,
			image:
				'https://tb-static.uber.com/prod/image-proc/processed_images/c07f5caf2384cafb87038f24dfd1d1d8/67b1ce06a25a64dc4a71581bb39c36c6.jpeg',
			deliveryTime: '30-40 min',
		},
		{
			id: '3',
			name: 'Amigos',
			slug: 'amigos',
			rating: 3.9,
			favorite: true,
			image:
				'https://tb-static.uber.com/prod/image-proc/processed_images/c07f5caf2384cafb87038f24dfd1d1d8/c9252e6c6cd289c588c3381bc77b1dfc.jpeg',
			deliveryTime: '20-30 min',
		},
		{
			id: '0',
			name: "Dilara's Kitchen",
			rating: 3.6,
			slug: 'dilara-s-kitchen',
			favorite: true,
			image:
				'https://tb-static.uber.com/prod/image-proc/processed_images/bf8d432616cba7ebb227d460a48cc234/fb86662148be855d931b37d6c1e5fcbe.webp',
			deliveryTime: '40-50 min',
		},
		{
			id: '1',
			name: 'Omer Kokorec',
			slug: 'omer-kokorec',
			rating: 2.1,
			favorite: false,
			image:
				'https://tb-static.uber.com/prod/image-proc/processed_images/2c00740e5aef5ab971a70fddfdb9e07f/97e6648b3593c29cb4a6335f976e6d84.jpeg',
			deliveryTime: '10-20 min',
		},
		{
			id: '2',
			name: 'Yagmur Waffle',
			slug: 'yagmur-waffle',
			rating: 4.0,
			favorite: true,
			image:
				'https://tb-static.uber.com/prod/image-proc/processed_images/c07f5caf2384cafb87038f24dfd1d1d8/67b1ce06a25a64dc4a71581bb39c36c6.jpeg',
			deliveryTime: '30-40 min',
		},
		{
			id: '3',
			name: 'Amigos',
			slug: 'amigos',
			rating: 3.9,
			favorite: true,
			image:
				'https://tb-static.uber.com/prod/image-proc/processed_images/c07f5caf2384cafb87038f24dfd1d1d8/c9252e6c6cd289c588c3381bc77b1dfc.jpeg',
			deliveryTime: '20-30 min',
		},
		{
			id: '0',
			name: "Dilara's Kitchen",
			rating: 3.6,
			slug: 'dilara-s-kitchen',
			favorite: true,
			image:
				'https://tb-static.uber.com/prod/image-proc/processed_images/bf8d432616cba7ebb227d460a48cc234/fb86662148be855d931b37d6c1e5fcbe.webp',
			deliveryTime: '40-50 min',
		},
		{
			id: '1',
			name: 'Omer Kokorec',
			slug: 'omer-kokorec',
			rating: 2.1,
			favorite: false,
			image:
				'https://tb-static.uber.com/prod/image-proc/processed_images/2c00740e5aef5ab971a70fddfdb9e07f/97e6648b3593c29cb4a6335f976e6d84.jpeg',
			deliveryTime: '10-20 min',
		},
		{
			id: '2',
			name: 'Yagmur Waffle',
			slug: 'yagmur-waffle',
			rating: 4.0,
			favorite: true,
			image:
				'https://tb-static.uber.com/prod/image-proc/processed_images/c07f5caf2384cafb87038f24dfd1d1d8/67b1ce06a25a64dc4a71581bb39c36c6.jpeg',
			deliveryTime: '30-40 min',
		},
		{
			id: '3',
			name: 'Amigos',
			slug: 'amigos',
			rating: 3.9,
			favorite: true,
			image:
				'https://tb-static.uber.com/prod/image-proc/processed_images/c07f5caf2384cafb87038f24dfd1d1d8/c9252e6c6cd289c588c3381bc77b1dfc.jpeg',
			deliveryTime: '20-30 min',
		},
		{
			id: '0',
			name: "Dilara's Kitchen",
			rating: 3.6,
			slug: 'dilara-s-kitchen',
			favorite: true,
			image:
				'https://tb-static.uber.com/prod/image-proc/processed_images/bf8d432616cba7ebb227d460a48cc234/fb86662148be855d931b37d6c1e5fcbe.webp',
			deliveryTime: '40-50 min',
		},
		{
			id: '1',
			name: 'Omer Kokorec',
			slug: 'omer-kokorec',
			rating: 2.1,
			favorite: false,
			image:
				'https://tb-static.uber.com/prod/image-proc/processed_images/2c00740e5aef5ab971a70fddfdb9e07f/97e6648b3593c29cb4a6335f976e6d84.jpeg',
			deliveryTime: '10-20 min',
		},
		{
			id: '2',
			name: 'Yagmur Waffle',
			slug: 'yagmur-waffle',
			rating: 4.0,
			favorite: true,
			image:
				'https://tb-static.uber.com/prod/image-proc/processed_images/c07f5caf2384cafb87038f24dfd1d1d8/67b1ce06a25a64dc4a71581bb39c36c6.jpeg',
			deliveryTime: '30-40 min',
		},
		{
			id: '3',
			name: 'Amigos',
			slug: 'amigos',
			rating: 3.9,
			favorite: true,
			image:
				'https://tb-static.uber.com/prod/image-proc/processed_images/c07f5caf2384cafb87038f24dfd1d1d8/c9252e6c6cd289c588c3381bc77b1dfc.jpeg',
			deliveryTime: '20-30 min',
		},
	]

	return restaurants
}

const menus: Menu[] = [
	{
		slug: 'amigos',
		categories: [
			{
				name: 'Taco',
				items: [
					{
						name: 'Beef Taco',
						image:
							'https://tb-static.uber.com/prod/image-proc/processed_images/a0ef1614fede6fa6bbb46f15b7ac4ab7/7f4ae9ca0446cbc23e71d8d395a98428.jpeg',
						info: 'Three big soft shell slow cooked pulled beef Taco with pickeld red onions, cilantro and Mexican cheese. Three big soft shell slow cooked pulled beef Taco with pickeld red onions, cilantro and Mexican cheese. Three big soft shell slow cooked pulled beef Taco with pickeld red onions, cilantro and Mexican cheese.',
						price: '€8.50',
						rating: '3.4',
						uuid: '1',
					},
					{
						name: 'Chicken Taco',
						image:
							'https://tb-static.uber.com/prod/image-proc/processed_images/28442ae42c4727eca70679c0f02ebab3/7f4ae9ca0446cbc23e71d8d395a98428.jpeg',
						info: 'Three big soft shell slow cooked pulled beef Taco with pickeld red onions, cilantro and Mexican cheese.',
						price: '€8.50',
						rating: '3.4',
						uuid: '2',
					},
				],
			},
			{
				name: 'Taco',
				items: [
					{
						name: 'Beef Taco',
						image:
							'https://tb-static.uber.com/prod/image-proc/processed_images/a0ef1614fede6fa6bbb46f15b7ac4ab7/7f4ae9ca0446cbc23e71d8d395a98428.jpeg',
						info: 'Three big soft shell slow cooked pulled beef Taco with pickeld red onions, cilantro and Mexican cheese. Three big soft shell slow cooked pulled beef Taco with pickeld red onions, cilantro and Mexican cheese. Three big soft shell slow cooked pulled beef Taco with pickeld red onions, cilantro and Mexican cheese.',
						price: '€8.50',
						rating: '3.4',
						uuid: '3',
					},
					{
						name: 'Chicken Taco',
						image:
							'https://tb-static.uber.com/prod/image-proc/processed_images/28442ae42c4727eca70679c0f02ebab3/7f4ae9ca0446cbc23e71d8d395a98428.jpeg',
						info: 'Three big soft shell slow cooked pulled beef Taco with pickeld red onions, cilantro and Mexican cheese.',
						price: '€8.50',
						rating: '3.4',
						uuid: '4',
					},
				],
			},
			{
				name: 'Desserts',
				items: [
					{
						name: 'Brownie',
						image:
							'https://tb-static.uber.com/prod/image-proc/processed_images/a0ef1614fede6fa6bbb46f15b7ac4ab7/7f4ae9ca0446cbc23e71d8d395a98428.jpeg',
						info: 'Three big soft shell slow cooked pulled beef Taco with pickeld red onions, cilantro and Mexican cheese.',
						price: '€4.50',
						rating: '90',
						uuid: '5',
					},
					{
						name: 'Carrot Cake',
						image:
							'https://tb-static.uber.com/prod/image-proc/processed_images/28442ae42c4727eca70679c0f02ebab3/7f4ae9ca0446cbc23e71d8d395a98428.jpeg',
						info: 'Three big soft shell slow cooked pulled beef Taco with pickeld red onions, cilantro and Mexican cheese.',
						price: '€8.50',
						rating: '3.4',
						uuid: '6',
					},
				],
			},
			{
				name: 'Drinks',
				items: [
					{
						name: 'Red Bull',
						image:
							'https://tb-static.uber.com/prod/image-proc/processed_images/a0ef1614fede6fa6bbb46f15b7ac4ab7/7f4ae9ca0446cbc23e71d8d395a98428.jpeg',
						info: 'Three big soft shell slow cooked pulled beef Taco with pickeld red onions, cilantro and Mexican cheese.',
						price: '€8.50',
						rating: '3.4',
						uuid: '7',
					},
					{
						name: 'Fanta',
						image:
							'https://tb-static.uber.com/prod/image-proc/processed_images/28442ae42c4727eca70679c0f02ebab3/7f4ae9ca0446cbc23e71d8d395a98428.jpeg',
						info: 'Three big soft shell slow cooked pulled beef Taco with pickeld red onions, cilantro and Mexican cheese.',
						price: '€8.50',
						rating: '3.4',
						uuid: '8',
					},
				],
			},
		],
	},
	{
		slug: 'yagmur-waffle',
		categories: [
			{
				name: 'Desserts',
				items: [
					{
						name: 'Waffle',
						image:
							'https://tb-static.uber.com/prod/image-proc/processed_images/5870694b1a03920b422c512eff1f85c0/f0d1762b91fd823a1aa9bd0dab5c648d.jpeg',
						info: 'Delicious hand-made Liege waffle with Chocolate Topping',
						price: '€6.50',
						rating: '3.6',
						uuid: '9',
					},
				],
			},
		],
	},
]

export async function getRestaurant(slug: string) {
	const restaurants = await getRestaurants()
	return restaurants.find(restaurant => restaurant.slug === slug) || null
}

export async function getRestaurantMenu(slug: string) {
	//Fake Network Behaviour
	await new Promise(resolve => setTimeout(resolve, 2000))
	return (await menus.find(restaurant => restaurant.slug === slug)) || null
}

export async function getMenuItem(slug: string, itemId: string) {
	//Fake Network Behaviour
	await new Promise(resolve => setTimeout(resolve, 2000))
	const menu = menus.find(restaurant => restaurant.slug === slug)
	const items = menu?.categories.flatMap(category => category.items)
	return items?.find(item => item.uuid === itemId)
}
