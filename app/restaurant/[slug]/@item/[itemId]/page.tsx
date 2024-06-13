import RestaurantItemModal from "@/components/RestaurantItemModal";

export default function Page({ params }: { params: { itemId: string } }) {
    return (<RestaurantItemModal params={params}></RestaurantItemModal>);
}
