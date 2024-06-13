import RestaurantPage from "@/components/RestaurantPage";

export default function Page({ params }: { params: { slug: string } }) {
    return (<RestaurantPage params={params} />);
}
