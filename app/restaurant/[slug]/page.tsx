import RestaurantPage from "@/components/restaurant/RestaurantPage";

interface PageProps {
    params: { slug: string }
    searchParams: { itemId: string }
}

export default function Page({ params, searchParams }: PageProps) {
    return (<RestaurantPage slug={params.slug} itemId={searchParams.itemId} />);
}
