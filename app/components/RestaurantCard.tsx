"use client";

import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const StyledCard = styled(Card)(() => ({
  display: "flex",
  flexDirection: "column",
  width: 288,
  height: 230,
  overflow: "visible",
  transition: "0.4s",
  boxShadow: "none",
}));

const StyledCardMedia = styled(CardMedia)({
  display: "flex",
  position: "relative",
  width: "100%",
  height: 130,
  borderRadius: "0.5rem",
});

const BoxRestaurantInfo = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  paddingTop: "1rem",
  zIndex: 1,
  alignContent: "center"
}));

const StyledDivCardContent = styled("div")(() => ({
  display: "flex",
  width: "100%",
  alignContent: "center",
  justifyContent: "center",
  alignItems: "center"
}));

const StyledDivRatio = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  backgroundColor: "#d5d5d5",
  padding: "0.5rem 0.5rem",
  fontWeight: "600",
  fontSize: "13px",
  width: "1.8rem",
  height: "1.8rem"
}));

const FavoriteButton = styled(IconButton)(() => ({
  position: 'absolute',
  top: 4,
  right: 4,
  padding: '8px',
  color: "#FFF",
}));

const StyledFavIcon = styled(FavoriteBorderOutlined)(() => ({
}));

const StyledFavFilledIcon = styled(Favorite)(() => ({
}));

const TypographyTitle = styled(Typography)(() => ({
  display: "flex",
  alignItems: "center",
  /* fontSize: "1.2rem",
  fontWeight: 400, */
  color: "black",
  width: "100%",
  height: "2rem"
}));

const TypographyInfo = styled(Typography)(() => ({
  /*  fontSize: "1rem",
   fontWeight: 200, */
  width: "100%",
  color: "gray",
  display: "flex",
  alignContent: "flex-start",
}));

type RestaurantCardProps = {
  name: string, rating: number, time: string; image: string, favorite: boolean
};

export function RestaurantCard(props: RestaurantCardProps) {
  return (
    <StyledCard>
      <StyledCardMedia image={props.image}>
        <FavoriteButton onClick={() => ({})}>
          {props.favorite ? <StyledFavFilledIcon /> : <StyledFavIcon />}
        </FavoriteButton>
      </StyledCardMedia>
      <BoxRestaurantInfo>
        <StyledDivCardContent>
          <TypographyTitle variant="h6">{props.name}</TypographyTitle>
          <StyledDivRatio>{props.rating}
          </StyledDivRatio>
        </StyledDivCardContent>
        <StyledDivCardContent>
          <TypographyInfo variant="body1">{props.time}</TypographyInfo>
        </StyledDivCardContent>
      </BoxRestaurantInfo>
    </StyledCard >
  );
}
