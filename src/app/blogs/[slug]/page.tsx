import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getBlogPost } from "@/config/blogPosts";
import Reveal from "@/components/motion/Reveal";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <div className="bg-cream pb-20 pt-32">
      <div className="mx-auto max-w-3xl px-6">
        <Link
          href="/blogs"
          className="flex items-center gap-1.5 text-sm font-medium text-plum-700 hover:underline"
        >
          <ChevronLeft size={15} /> Back to Blog
        </Link>

        <Reveal>
          <p className="mt-6 text-xs text-ink-soft">
            {new Date(post.date).toLocaleDateString("en-CA", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1 className="mt-1 text-2xl font-bold text-ink sm:text-3xl">{post.title}</h1>

          <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-2xl">
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
          </div>

          <div className="mt-8 space-y-4">
            {post.content.map((p, i) => (
              <p key={i} className="leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
