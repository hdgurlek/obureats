"use client";

import React, { useEffect, useState } from 'react';
import { Box, CardMedia, Grid, Typography, styled } from '@mui/material';
import { getRestaurant, getRestaurantMenu } from '@/src/api';
import { Restaurant } from '@/types/Restaurant';
import { MenuItemCard } from '@/components/MenuItemCard';
import { Menu, MenuCategory } from '@/types/Menu';

const HeaderImage = styled(CardMedia)(() => ({
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    height: 250,
    width: "100%",
    borderRadius: "1rem",
}));

const RestaurantContainer = styled(`div`)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    width: '64%',
    margin: 'auto',
}));

const RestaurantHeader = styled(`div`)(() => ({
    margin: '20px 0px',
}));

const MenuCategoryGrid = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
    justifyContent: "center",
    alignItems: "center",
    margin: "1rem 0"
}));

export default function RestaurantPage({ params }: { params: { slug: string } }) {
    const { slug } = params
    const [menu, setMenu] = useState<Menu | null>(null);
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenu = async () => {
            if (!slug) return;

            try {
                /* const res = await fetch(`/api/menu/${slug}`);
                const data: Menu = await res.json(); */
                const restaurant = await getRestaurant(slug);
                const menu = await getMenu(slug);
                setMenu(menu);
                setRestaurant(restaurant);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching menu:', error);
                setLoading(false);
            }
        };

        fetchMenu();
    }, [slug]);

    if (loading) return <div>Loading...</div>;
    if (!restaurant || !menu) return <div>Restaurant not found</div>;

    console.log("image : " + restaurant.image);
    return (
        <RestaurantContainer>
            <HeaderImage image={restaurant.image}></HeaderImage>
            <RestaurantHeader>
                <Typography fontWeight={600} variant="h4">{restaurant.name}</Typography>
            </RestaurantHeader>
            <div>
                {menu.categories.map((item, i) => (
                    <div key={i}>
                        <Typography fontWeight={600} variant='h6'>{item.name}</Typography>
                        <MenuCategoryContainer key={i} name={item.name} items={item.items}></MenuCategoryContainer>
                    </div>
                ))}
            </div>
        </RestaurantContainer>);
}

function MenuCategoryContainer({ items }: MenuCategory) {
    return (<div>
        <MenuCategoryGrid>
            {items.map((item, i) => (
                <MenuItemCard key={i} menu={item}></MenuItemCard>
            ))}
        </MenuCategoryGrid>
    </div >);
}

async function getMenu(slug: string) {
    //const menu = await fetch(`https://.../restaurants/menu/${slug}`).then((res) => JSON.stringify(res.json()));
    return getRestaurantMenu(slug);
}