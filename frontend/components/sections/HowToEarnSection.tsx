import { TrendingUp, MonitorPlay, ShieldCheck, Users } from "lucide-react";

export default function HowToEarnSection() {
  return (
    <section className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 m-5">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-4xl sm:text-5xl font-normal bg-linear-to-r text-white bg-clip-text  mb-4">
          Монетизация игровой витрины
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Пошаговое руководство, как создать пассивный доход на HTML5-играх с
          помощью Рекламной сети Яндекса (РСЯ).
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Шаг 1 */}
        <div className="flex gap-5 p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
            <span className="text-2xl font-bold">1</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
              Создание качественной витрины
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Доход напрямую зависит от времени, которое пользователь проводит
              на сайте. Используйте наш готовый движок или создайте свой на
              Next.js. Главное: мгновенная загрузка игр, адаптивность под
              мобильные устройства и отсутствие раздражающих элементов.
            </p>
          </div>
        </div>

        {/* Шаг 2 */}
        <div className="flex gap-5 p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
            <span className="text-2xl font-bold">2</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
              Подключение к РСЯ (Рекламная сеть Яндекса)
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Для подключения сайта к РСЯ необходимо: посещаемость от 100
              человек в сутки, наличие оригинального контента (описания игр,
              блог) и возраст сайта от 1 месяца. Зарегистрируйтесь в Яндекс
              Директе и добавьте сайт в программу.
            </p>
          </div>
        </div>

        {/* Шаг 3 */}
        <div className="flex gap-5 p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
            <MonitorPlay size={28} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
              Оптимальные форматы рекламы
            </h3>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start gap-2">
                <TrendingUp size={18} className="text-violet-500 mt-1" />{" "}
                <strong>Полноэкранная реклама (Interstitial):</strong>{" "}
                Показывается при переходе между уровнями или при загрузке игры.
                Дает самый высокий CPM.
              </li>
              <li className="flex items-start gap-2">
                <TrendingUp size={18} className="text-violet-500 mt-1" />{" "}
                <strong>Видеореклама (Rewarded Video):</strong> Игрок
                добровольно смотрит рекламу за внутриигровую валюту или
                дополнительную жизнь. Максимальная лояльность аудитории.
              </li>
              <li className="flex items-start gap-2">
                <TrendingUp size={18} className="text-violet-500 mt-1" />{" "}
                <strong>Баннеры:</strong> Размещайте их в сайдбаре или под
                игрой, но не перекрывайте игровой процесс.
              </li>
            </ul>
          </div>
        </div>

        {/* Шаг 4 */}
        <div className="flex gap-5 p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
            <Users size={28} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
              Удержание и масштабирование
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Регулярно добавляйте новинки (минимум 5-10 игр в неделю). Ведите
              блог для SEO-трафика. Чем больше органических посетителей из
              поиска, тем выше ваш доход при тех же затратах на поддержку.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 p-8 rounded-3xl bg-linear-to-br from-[#6b21a8] to-[#7c3aed] text-center text-white shadow-xl shadow-violet-900/20">
        <h3 className="text-2xl font-bold mb-3">Хотите готовое решение?</h3>
        <p className="text-violet-100 mb-6 max-w-xl mx-auto">
          Мы предоставляем готовые шаблоны игровых порталов с уже настроенными
          местами под рекламные блоки Яндекс.
        </p>
        <a
          href="/partnership"
          className="inline-flex items-center gap-2 bg-white text-violet-700 font-bold px-8 py-3 rounded-full hover:bg-zinc-100 transition-colors shadow-lg"
        >
          Обсудить партнерство
        </a>
      </div>
    </section>
  );
}
