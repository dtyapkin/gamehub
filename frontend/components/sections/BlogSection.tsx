// import { Calendar, ArrowRight, Gamepad2, TrendingUp, Code } from "lucide-react";

// const BLOG_POSTS = [
//   {
//     id: 1,
//     title: "Топ-10 HTML5 игр, в которые стоит сыграть в 2026 году",
//     category: "Подборки",
//     date: "15 сен 2026",
//     icon: Gamepad2,
//   },
//   {
//     id: 2,
//     title:
//       "Как оптимизировать браузер для максимальной производительности в WebGL",
//     category: "Гайды",
//     date: "12 сен 2026",
//     icon: Code,
//   },
//   {
//     id: 3,
//     title: "История жанра Tower Defense: от Flash к современным HTML5",
//     category: "История",
//     date: "10 сен 2026",
//     icon: TrendingUp,
//   },
//   {
//     id: 4,
//     title: "Почему HTML5-игры возвращают популярность на мобильных устройствах",
//     category: "Тренды",
//     date: "08 сен 2026",
//     icon: TrendingUp,
//   },
//   {
//     id: 5,
//     title: "5 скрытых жемчужин нашего каталога, которые вы могли пропустить",
//     category: "Подборки",
//     date: "05 сен 2026",
//     icon: Gamepad2,
//   },
//   {
//     id: 6,
//     title: "Безопасность в браузере: как мы защищаем наших игроков",
//     category: "Безопасность",
//     date: "01 сен 2026",
//     icon: Code,
//   },
//   {
//     id: 7,
//     title: "Интервью с инди-разработчиком: как создать хит за 3 месяца",
//     category: "Интервью",
//     date: "28 авг 2026",
//     icon: TrendingUp,
//   },
//   {
//     id: 8,
//     title: "Лучшие кооперативные игры для игры с друзьями на одном экране",
//     category: "Подборки",
//     date: "25 авг 2026",
//     icon: Gamepad2,
//   },
//   {
//     id: 9,
//     title: "Как сохранить прогресс в игре: полное руководство для новичков",
//     category: "Гайды",
//     date: "20 авг 2026",
//     icon: Code,
//   },
//   {
//     id: 10,
//     title: "Эволюция графики в браузерных играх: сравнение 2020 и 2026",
//     category: "Тренды",
//     date: "15 авг 2026",
//     icon: TrendingUp,
//   },
//   {
//     id: 11,
//     title: "Топ-7 расслабляющих игр для перерыва на работе",
//     category: "Подборки",
//     date: "10 авг 2026",
//     icon: Gamepad2,
//   },
//   {
//     id: 12,
//     title: "Что такое WebAssembly и как он меняет браузерный гейминг",
//     category: "Технологии",
//     date: "05 авг 2026",
//     icon: Code,
//   },
//   {
//     id: 13,
//     title: "Как мы отбираем игры: внутренние критерии качества портала",
//     category: "О нас",
//     date: "01 авг 2026",
//     icon: TrendingUp,
//   },
//   {
//     id: 14,
//     title: "Руководство по сенсорному управлению в мобильных браузерах",
//     category: "Гайды",
//     date: "28 июл 2026",
//     icon: Code,
//   },
//   {
//     id: 15,
//     title: "Анонс: закрытое бета-тестирование новых эксклюзивов портала",
//     category: "Новости",
//     date: "25 июл 2026",
//     icon: Gamepad2,
//   },
// ];

// export default function BlogSection() {
//   return (
//     <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 m-5">
//       <div className="text-center max-w-3xl mx-auto mb-12">
//         <h1 className="text-4xl sm:text-5xl font-normal text-zinc-900 dark:text-white mb-4">
//           Блог портала
//         </h1>
//         <p className="text-lg text-zinc-600 dark:text-zinc-400">
//           Новости, гайды, обзоры новинок и инсайды из мира браузерного гейминга.
//         </p>
//       </div>

//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//         {BLOG_POSTS.map((post) => {
//           const Icon = post.icon;
//           return (
//             <article
//               key={post.id}
//               className="group flex flex-col p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300">
//                   <Icon size={12} /> {post.category}
//                 </span>
//                 <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
//                   <Calendar size={12} /> {post.date}
//                 </span>
//               </div>

//               <h3 className="text-lg font-normal text-zinc-900 dark:text-white mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2">
//                 {post.title}
//               </h3>

//               <div className="mt-auto pt-4">
//                 <a
//                   href={`/blog/${post.id}`}
//                   className="inline-flex items-center gap-2 text-sm font-normal text-violet-600 dark:text-violet-400 hover:gap-3 transition-all"
//                 >
//                   Читать далее <ArrowRight size={16} />
//                 </a>
//               </div>
//             </article>
//           );
//         })}
//       </div>
//     </section>
//   );
// }

// components/sections/BlogSection.tsx

import {
  Calendar,
  ArrowRight,
  Clock,
  Gamepad2,
  TrendingUp,
  Code,
} from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";

const CATEGORY_ICONS = {
  Подборки: Gamepad2,
  Гайды: Code,
  История: TrendingUp,
  Тренды: TrendingUp,
  Безопасность: Code,
  Интервью: TrendingUp,
  Технологии: Code,
  "О нас": TrendingUp,
  Новости: Gamepad2,
};

export default function BlogSection() {
  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 m-3">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl sm:text-5xl font-normal text-zinc-900/50 dark:text-white mb-4">
          Блог портала
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Новости, гайды, обзоры новинок и инсайды из мира браузерного гейминга.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {BLOG_POSTS.map((post) => {
          const Icon =
            CATEGORY_ICONS[post.category as keyof typeof CATEGORY_ICONS] ||
            Gamepad2;
          return (
            <article
              key={post.slug}
              className="group flex flex-col p-6 rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300">
                  <Icon size={12} /> {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                  <Clock size={12} /> {post.readTime}
                </span>
              </div>

              <h3 className="text-lg font-normal text-zinc-900 dark:text-white mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2">
                {post.title}
              </h3>

              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2  grow">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                  <Calendar size={12} /> {post.date}
                </span>
                <a
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:gap-3 transition-all"
                >
                  Читать <ArrowRight size={16} />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
