import { AccordionItem } from "@/components/ui/info-ui";

export default function FaqSection() {
  const faqGroups = [
    {
      category: "🎮 Игры и прогресс",
      items: [
        {
          q: "Почему игра не загружается?",
          a: "Убедитесь, что у вас стабильное интернет-соединение и обновленный браузер (Chrome, Firefox, Safari). Мы используем технологии WebGL и Canvas, которые требуют современных версий браузеров. Также проверьте, не блокирует ли AdBlock скрипты игры.",
        },
        {
          q: "Сохраняется ли мой прогресс?",
          a: "Да, данные ваших достижений сохраняются в локальном хранилище (Local Storage) вашего устройства. Обратите внимание: если вы чистите историю и кэш браузера, прогресс может быть утерян.",
        },
      ],
    },
    {
      category: "🛡️ Безопасность и устройства",
      items: [
        {
          q: "Безопасно ли здесь играть?",
          a: 'Абсолютно. Мы не требуем скачивания сторонних файлов (.exe, .apk) и не собираем лишних персональных данных. Все игры запускаются в безопасной "песочнице" браузера.',
        },
        {
          q: "Работает ли портал на телефоне?",
          a: "Да, все игры адаптированы под сенсорное управление и корректно отображаются на экранах любых размеров (iOS и Android).",
        },
      ],
    },
  ];

  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 m-5">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl sm:text-5xl font-normal text-zinc-900 dark:text-white mb-4">
          Ответы на главные вопросы
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Не нашли ответ на свой вопрос?{" "}
          <a
            href="/feedback"
            className="text-violet-600 dark:text-violet-400 font-semibold hover:underline"
          >
            Напишите нам
          </a>
          , и мы поможем.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {faqGroups.map((group) => (
          <div key={group.category}>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
              {group.category}
            </h2>
            <div className="space-y-3">
              {group.items.map((item, idx) => (
                <AccordionItem key={idx} question={item.q} answer={item.a} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
