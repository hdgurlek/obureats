"use client";

import { getRestaurant, getRestaurantMenu } from '@/app/api';
import React, { useEffect, useState } from 'react';
import { Menu, MenuCategory } from './menu';
import { Box, CardMedia, Grid, Typography, styled } from '@mui/material';
import { MenuItemCard } from './MenuItemCard';
import { Restaurant } from '@/app/components/Restaurant';
import "../../globals.css";
import styles from "../../page.module.css";

const HeaderImage = styled(CardMedia)(() => ({
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    height: 250,
    width: "100%",
    borderRadius: "0.5rem",
}));

const MenuContainer = styled(Box)(() => ({
    display: "flex",
    flexGrow: "1",
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    height: "",
}));

const MenuCategoryGrid = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
    justifyContent: "center",
    alignItems: "center",
    margin: "1rem 0"
}));

export default function Page({ params }: { params: { slug: string } }) {

    const [menu, setMenu] = useState<Menu | null>(null);
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenu = async () => {
            if (!params.slug) return;

            try {
                /* const res = await fetch(`/api/menu/${slug}`);
                const data: Menu = await res.json(); */
                const restaurant = await getRestaurant(params.slug);
                const menu = await getMenu(params.slug);
                setMenu(menu);
                setRestaurant(restaurant);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching menu:', error);
                setLoading(false);
            }
        };

        fetchMenu();
    }, [params.slug]);

    if (loading) return <div>Loading...</div>;
    if (!restaurant || !menu) return <div>Restaurant not found</div>;

    console.log("image : " + restaurant.image);
    return (
        <div className={styles.restaurant} >
            <HeaderImage image={restaurant.image}></HeaderImage>
            <div className={styles.headerRestaurant}>
                <Typography fontWeight={600} variant="h4">{restaurant.name}</Typography>
            </div>
            <div>
                {menu.categories.map((item, i) => (
                    <div key={i}>
                        <Typography fontWeight={600} variant='h6'>{item.name}</Typography>
                        <MenuCategoryContainer key={i} name={item.name} items={item.items}></MenuCategoryContainer>
                    </div>
                ))}
            </div>
        </div>);
}

function MenuCategoryContainer({ items }: MenuCategory) {
    return (<div>
        <MenuCategoryGrid>
            {items.map((item, i) => (
                <MenuItemCard key={i} name={item.name} price={item.price} rating={item.rating} info={item.info} image={item.image} ></MenuItemCard>
            ))}
        </MenuCategoryGrid>
    </div >);
}

async function getMenu(slug: string) {
    //const menu = await fetch(`https://.../restaurants/menu/${slug}`).then((res) => JSON.stringify(res.json()));
    return getRestaurantMenu(slug);
}