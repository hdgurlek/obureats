"use client";

import Page from "./page";

export default function Default({ params }: { params: { slug: string } }) {
  return <Page params={params} />
}