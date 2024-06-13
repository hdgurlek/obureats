"use client";

import {
  Box,
  Modal,
  CardMedia,
  styled,
  Typography,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";

const style = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 968,
  height: 644,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "1rem",
  p: 4,
  gap: 2,
};

const style1 = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: 600,
  bgcolor: "background.paper",
  p: 0,
};

const ItemImage = styled(CardMedia)(() => ({
  component: "img",
  alt: "item-img",
  height: 600,
  width: "100%",
}));

const PriceText = styled(Typography)(() => ({
  color: "gray",
}));

const AddButton = styled(Button)(() => ({
  backgroundColor: "#000",
  alignSelf: "end",
}));

export default function RestaurantItemModal({ params }: { params: { itemId: string } }) {
  const router = useRouter();
  console.log(params.itemId);
  return (
    <Modal
      open={true}
      onClose={() => {
        router.back();
      }}
    >
      <Box sx={style}>
        <ItemImage image="https://tb-static.uber.com/prod/image-proc/processed_images/28442ae42c4727eca70679c0f02ebab3/7f4ae9ca0446cbc23e71d8d395a98428.jpeg"></ItemImage>
        <Box sx={style1}>
          <Typography variant="h4">Item Name</Typography>
          <PriceText variant="h5">Price</PriceText>
          <Typography>Details</Typography>
          <AddButton variant="contained">Add 1 to Order</AddButton>
        </Box>
      </Box>
    </Modal>
  );
}
