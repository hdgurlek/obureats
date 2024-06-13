import React from "react";

export default function RestaurantLayout({
    item,
    children,
}: {
    item: React.ReactNode,
    children: React.ReactNode
}) {
    return (<>
        {item}
        {children}
    </>
    );
}
