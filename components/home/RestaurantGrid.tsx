'use client';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { RestaurantCard } from './RestaurantCard';
import { getRestaurants } from '@/src/api';

const GridBox = styled(Box)(() => ({
    display: "flex",
    flexGrow: "1",
    justifyContent: "center",
    alignItems: "center"
}));

const GridContainer = styled(Grid)(() => ({
    display: 'flex',
    gap: '1.6rem',
    alignItems: 'center',
    justifyContent: 'center',
}));

let restaurants = getRestaurants();

export default function RestaurantGrid() {
    return (
        <GridBox>
            <GridContainer container>{
                restaurants.map(
                    (item) =>
                        <RestaurantCard id={item.id} key={item.id} name={item.name} slug={item.slug} rating={item.rating} deliveryTime={item.deliveryTime} favorite={item.favorite} image={item.image}>
                        </RestaurantCard>)
            }</GridContainer>
        </GridBox>
    );
}
