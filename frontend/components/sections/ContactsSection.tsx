import { Mail, Clock, MessageCircle, Zap } from "lucide-react";

export default function ContactsSection() {
  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 m-5">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl sm:text-5xl font-normal text-zinc-900 dark:text-white mb-4">
          Всегда на связи
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Нашли баг или есть идея по улучшению? Мы ценим ваше время и стараемся
          решать любые вопросы максимально быстро.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Email Card */}
        <a
          href="mailto:support@yourportal.com"
          className="group p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-violet-500/50 transition-all"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400 group-hover:scale-110 transition-transform">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 dark:text-white">
                E-mail поддержка
              </h3>
              <p className="text-violet-600 dark:text-violet-400 font-medium">
                support@gamedome.com
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <Clock size={16} />
            <span>Ответ в течение 12 часов (10:00 - 22:00 МСК)</span>
          </div>
        </a>

        {/* Messenger Card */}
        <a
          href="https://t.me/yourportal"
          target="_blank"
          rel="noopener noreferrer"
          className="group p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-violet-500/50 transition-all"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <MessageCircle size={24} />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 dark:text-white">
                Telegram / Discord
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium">
                @gamedome_support
              </p>
            </div>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Самый быстрый способ связи с нашей командой для срочных вопросов.
          </p>
        </a>
      </div>

      {/* Quick Fix Box */}
      <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50">
        <h3 className="font-bold text-amber-800 dark:text-amber-200 mb-3 flex items-center gap-2">
          <Zap size={18} /> Игра не запускается? Быстрое решение:
        </h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-amber-700 dark:text-amber-300/80">
          <li>
            Перезагрузите страницу или попробуйте другой браузер (Chrome,
            Firefox, Safari).
          </li>
          <li>
            Отключите расширения типа AdBlock, они могут блокировать
            WebGL-скрипты.
          </li>
          <li>
            Если не помогло — пришлите скриншот ошибки на нашу почту, мы
            разберемся!
          </li>
        </ul>
      </div>
    </section>
  );
}
