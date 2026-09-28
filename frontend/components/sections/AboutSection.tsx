import { Zap, Shield, Gamepad2 } from "lucide-react";
import { FeatureCard } from "@/components/ui/info-ui";

export default function AboutSection() {
  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 m-3">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl sm:text-5xl font-normal bg-linear-to-r  text-white bg-clip-text mb-4">
          Больше, чем просто игры
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Мы превратили любовь к видеоиграм в полноценный портал. Наша цель —
          собрать лучшую коллекцию HTML5-игр, в которые можно играть где угодно,
          без установок и лишних загрузок.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <FeatureCard
          icon={<Zap size={24} />}
          title="Мгновенный старт"
          desc="Играйте на компьютере, планшете или смартфоне прямо в браузере. Никаких лаунчеров и ожиданий."
        />
        <FeatureCard
          icon={<Shield size={24} />}
          title="Честный гейминг"
          desc="Мы не гонимся за количеством. Только проверенные проекты без навязчивого доната и агрессивной рекламы."
        />
        <FeatureCard
          icon={<Gamepad2 size={24} />}
          title="Ручной отбор"
          desc="Ежедневно тестируем десятки новинок, чтобы добавить на сайт только то, что действительно стоит вашего времени."
        />
      </div>
    </section>
  );
}
