'use client';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { RestaurantCard } from './RestaurantCard';
import { getRestaurants } from '../api';
import { Restaurant } from './Restaurant';
/* 
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
})); */

const RestaurantGridBox = styled(Box)(() => ({
    display: "flex",
    flexGrow: "1",
    justifyContent: "center",
    alignItems: "center"
}));

const GridContainer = styled(Grid)(({ theme }) => ({
    display: 'flex',
    gap: '1.6rem',
    alignItems: 'center',
    justifyContent: 'center',
}));

let restaurants = getRestaurants();

export default function RestaurantGrid() {
    return (
        <RestaurantGridBox>
            <GridContainer container>{
                restaurants.map(
                    (item) =>
                        <RestaurantCard key={item.id} name={item.name} rating={item.rating} time={item.time} favorite={item.favorite} image={item.image}>
                        </RestaurantCard>)
            }</GridContainer>
        </RestaurantGridBox>
    );
}
