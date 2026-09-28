// app/blog/[slug]/page.tsx

import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, User, ArrowLeft, ChevronRight } from "lucide-react";
import { BLOG_POSTS, getPostBySlug, getAllPostSlugs } from "@/lib/blog-data";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { RightSidebarExtra } from "@/components/layout/RightSidebarExtra";
import { Footer } from "@/components/layout/Footer";

// Генерируем статические параметры для всех статей (лучшая практика для SEO и скорости)
export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({
    slug,
  }));
}

// Метаданные для SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Статья не найдена",
    };
  }

  return {
    title: `${post.title} | Блог`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-dark">
      <Header />
      <div className="max-w-360 mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="flex gap-4 sm:gap-6">
          <div className="hidden lg:block shrink-0 ">
            <Sidebar />
          </div>
          <main className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 mainBlog">
            <article className="max-w-3xl mx-auto">
              {/* Хлебные крошки */}
              <nav className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                <Link
                  href="/"
                  className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                >
                  Главная
                </Link>
                <ChevronRight size={14} />
                <Link
                  href="/blog"
                  className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                >
                  Блог
                </Link>
                <ChevronRight size={14} />
                <span className="text-zinc-900 dark:text-white truncate">
                  {post.title}
                </span>
              </nav>

              {/* Заголовок и метаданные */}
              <header className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300">
                    {post.category}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white dark:text-white mb-6 leading-tight">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <User size={16} />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={16} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={16} />
                    <span>{post.readTime} чтения</span>
                  </div>
                </div>
              </header>

              {/* Контент статьи */}
              <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6 text-zinc-700 dark:text-zinc-300">
                {post.content.map((paragraph, index) => (
                  <div
                    key={index}
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ))}
              </div>

              {/* Навигация */}
              <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-violet-600 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white font-semibold hover:border-violet-500/50 hover:shadow-md transition-all"
                >
                  <ArrowLeft size={18} />
                  Вернуться к списку статей
                </Link>
              </div>
            </article>
          </main>
          {/* <div className="hidden xl:block shrink-0">
            <RightSidebarExtra />
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

// import { Footer } from "@/components/layout/Footer";
// import { Header } from "@/components/layout/Header";
// import { RightSidebarExtra } from "@/components/layout/RightSidebarExtra";
// import { Sidebar } from "@/components/layout/Sidebar";
// import AboutSection from "@/components/sections/AboutSection";

// export const metadata = {
//   title: "О нас | Игровой портал",
//   description: "Узнайте больше о нашей миссии и команде энтузиастов.",
// };

// export default function AboutPage() {
//   return (
//     <div className="min-h-screen bg-dark">
//       <Header />
//       <div className="max-w-360 mx-auto px-3 sm:px-4 py-4 sm:py-6">
//         <div className="flex gap-4 sm:gap-6">
//           <div className="hidden lg:block shrink-0 ">
//             <Sidebar />
//           </div>
//           <main className="flex-1 min-w-0 mainTwo">
//             {/* <h1 className="text-3xl font-bold text-white  mb-2">О нас</h1> */}

//             <AboutSection />
//           </main>
//           <div className="hidden xl:block shrink-0">
//             <RightSidebarExtra />
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }
