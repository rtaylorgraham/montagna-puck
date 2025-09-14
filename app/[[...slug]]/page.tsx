import { Render } from "@measured/puck";
import config from "@/lib/puck-config";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function PublishedPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const path = params.slug ? `/${params.slug.join("/")}` : "/home";

  const page = await prisma.page.findUnique({
    where: { path },
  });

  if (!page || !page.published) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Render config={config} data={page.data as any} />
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug?: string[] };
}) {
  const path = params.slug ? `/${params.slug.join("/")}` : "/home";
  
  const page = await prisma.page.findUnique({
    where: { path },
  });

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  // Extract title from page data if available
  const data = page.data as any;
  const title = data?.root?.title || path.replace("/", "").replace("-", " ");

  return {
    title: `${title} | Montagna Travel`,
    description: data?.root?.description || "Experience the world's most iconic mountain passes with Montagna Travel",
  };
}