"use client";

import * as React from 'react';

export default function Page({ params }: { params: { slug: string } }) {

    return <p>Hello, this is restaurant {params.slug}.</p>
}