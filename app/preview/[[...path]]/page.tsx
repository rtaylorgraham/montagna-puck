import { Render } from "@measured/puck";
import config from "@/lib/puck-config";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function PreviewPage({
  params,
}: {
  params: { path?: string[] };
}) {
  const path = params.path ? `/${params.path.join("/")}` : "/home";

  const page = await prisma.page.findUnique({
    where: { path },
  });

  if (!page) {
    notFound();
  }

  // Show draft if available, otherwise show published version
  const data = page.draft || page.data;

  return (
    <div className="min-h-screen">
      <div className="bg-yellow-100 border-b border-yellow-300 px-4 py-2 text-center text-sm">
        <span className="font-semibold">Preview Mode</span> - This is how your page will look when published
        <a 
          href={`/admin${path}`}
          className="ml-4 text-blue-600 hover:underline"
        >
          ← Back to Editor
        </a>
      </div>
      <Render config={config} data={data as any} />
    </div>
  );
}