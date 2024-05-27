
"use client";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { createTheme, styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { MenuItem } from "./menu";

const Container = styled(Card)(() => ({
    display: "flex",
    flexDirection: "row",
    height: 145,
    maxWidth: 660,
    transition: "0.4s",
    boxShadow: "none",
    border: "0.1rem solid #eaeaea",
    borderRadius: "0.5rem",

}));

const ItemImage = styled(CardMedia)({
    display: "flex",
    width: 145,
    height: 145,
    borderRadius: "0 0.5rem 0.5rem 0",
    justifySelf: "flex-end",
    minWidth: 145,
    minHeight: 145,
});

const Info = styled("div")(() => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
    padding: "1rem"
}));

const Name = styled(Typography)(() => ({
    display: "flex",
    width: "100%",
    alignItems: "center",
    fontWeight: 600,
}));

const Details = styled(Typography)(() => ({
    display: "flex",
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center"
}));

const Price = styled(Typography)(() => ({
    width: "100%",
    color: "gray",
    display: "flex",
    alignContent: "flex-start",
}));

export function MenuItemCard(props: MenuItem) {
    return <div>
        <Container>
            <Info>
                <Name variant="subtitle1">
                    {props.name}
                </Name>
                <Price>{props.price}</Price>
                <Details>{props.info}</Details>
            </Info>
            <ItemImage image={props.image}></ItemImage>
        </Container>
    </div>
}


