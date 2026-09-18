import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/config/blogPosts";
import Reveal from "@/components/motion/Reveal";

export const metadata = { title: "Blog | Marzia Afroze" };

export default function BlogsPage() {
  return (
    <div className="bg-cream pb-20 pt-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-plum-600">
            Insights
          </p>
          <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">Blog</h1>
          <p className="mx-auto mt-3 max-w-xl text-ink-soft">
            Market updates, buyer &amp; seller tips, and local GTA real estate insights.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <Reveal key={post.slug} delay={0.08 * i} y={16} className="h-full">
              <Link
                href={`/blogs/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition hover:shadow-lg"
              >
                <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs text-ink-soft">
                    {new Date(post.date).toLocaleDateString("en-CA", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h2 className="mt-1 font-semibold text-ink">{post.title}</h2>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm text-ink-soft">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
