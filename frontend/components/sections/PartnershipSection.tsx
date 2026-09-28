import { PartnershipCard } from "@/components/ui/info-ui";

export default function PartnershipSection() {
  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 m-5">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl sm:text-5xl font-normal text-zinc-900 dark:text-white mb-4">
          Работаем на результат
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Ваш проект заслуживает качественного трафика. Мы предлагаем форматы
          сотрудничества для разработчиков игр, рекламных сетей и блогеров.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        <PartnershipCard
          title="Размещение HTML5-игр"
          desc="Вы разрабатываете игры? Мы добавим их в нашу коллекцию с указанием авторства, прямой ссылкой на ваш сайт и честной статистикой запусков."
        />
        <PartnershipCard
          title="Нативная реклама"
          desc="Интеграция ваших баннеров и предложений в игровое пространство без ущерба для пользовательского опыта (User Experience)."
        />
        <PartnershipCard
          title="Совместные турниры и API"
          desc="Организация мероприятий на базе портала или предоставление доступа к нашему каталогу игр через API для ваших платформ."
        />
      </div>

      <div className="max-w-4xl mx-auto mt-8 p-8 rounded-3xl bg-linear-to-br from-[#6b21a8] to-[#7c3aed] text-center text-white shadow-xl shadow-violet-900/20">
        <h3 className="text-2xl font-bold mb-3">Готовы обсудить условия?</h3>
        <p className="text-violet-100 mb-6 max-w-xl mx-auto">
          Напишите нам, и мы подготовим индивидуальное предложение, которое
          будет выгодно обеим сторонам.
        </p>
        <a
          href="mailto:b2b@yourportal.com"
          className="inline-flex items-center gap-2 bg-white text-violet-700 font-bold px-8 py-3 rounded-full hover:bg-zinc-100 transition-colors shadow-lg"
        >
          Написать на b2b@yourportal.com
        </a>
      </div>
    </section>
  );
}
