import { notFound } from "next/navigation";
import { ContentPage, pageSections } from "@/components/pages/ContentPage";

export function generateStaticParams() {
  return pageSections.map((section) => ({ section }));
}

export default async function Page({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!pageSections.includes(section as (typeof pageSections)[number])) notFound();
  return <ContentPage locale="zh" section={section as (typeof pageSections)[number]} />;
}
