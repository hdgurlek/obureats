export function getRestaurants() {
  const restaurants = [
    {
      id: "0",
      name: "Dilara's Kitchen",
      rating: 3.6,
      slug: "dilara-s-kitchen",
      favorite: true,
      image:
        "https://tb-static.uber.com/prod/image-proc/processed_images/bf8d432616cba7ebb227d460a48cc234/fb86662148be855d931b37d6c1e5fcbe.webp",
      time: "40-50 min",
    },
    {
      id: "1",
      name: "Omer Kokorec",
      slug: "omer-kokorec",
      rating: 2.1,
      favorite: false,
      image:
        "https://tb-static.uber.com/prod/image-proc/processed_images/2c00740e5aef5ab971a70fddfdb9e07f/97e6648b3593c29cb4a6335f976e6d84.jpeg",
      time: "10-20 min",
    },
    {
      id: "2",
      name: "Yagmur Waffle",
      slug: "yagmur-waffle",
      rating: 4.0,
      favorite: true,
      image:
        "https://tb-static.uber.com/prod/image-proc/processed_images/c07f5caf2384cafb87038f24dfd1d1d8/67b1ce06a25a64dc4a71581bb39c36c6.jpeg",
      time: "30-40 min",
    },
    {
      id: "3",
      name: "Enes Ocakbasi",
      slug: "enes-ocakbasi",
      rating: 3.9,
      favorite: true,
      image:
        "https://tb-static.uber.com/prod/image-proc/processed_images/f57fb461cfafbbb63b57e8a50c81c5d0/f3376a06b92224efbe50167fb7cb61e4.jpeg",
      time: "20-30 min",
    },
  ];

  return restaurants;
}

export function getRestaurant(slug: string) {
  const restaurant = {
    id: "sdf",
    name: "Enes Ocakbasi",
    slug: "enes-ocakbasi",
    rating: "2.3",
    favorite: true,
    image:
      "https://tb-static.uber.com/prod/image-proc/processed_images/f57fb461cfafbbb63b57e8a50c81c5d0/f3376a06b92224efbe50167fb7cb61e4.jpeg",
    time: "20-30 min",
  };

  return restaurant;
}

export function getRestaurantMenu() {}
