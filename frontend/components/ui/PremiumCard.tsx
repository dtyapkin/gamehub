import { Crown, Check } from "lucide-react";

export function PremiumCard() {
  return (
    <div className="bg-linear-to-br from-purple-600 to-pink-500 rounded-2xl p-6 text-white">
      <div className="flex justify-center mb-3">
        <div className="bg-yellow-400 rounded-xl p-3">
          <Crown className="w-8 h-8 text-yellow-700" />
        </div>
      </div>
      <h3 className="text-xl font-bold text-center mb-4">Premium</h3>
      <ul className="space-y-2.5 mb-5">
        {["3000 игр", "Лучший поиск", "3 Шаблона"].map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm">
            <Check className="w-4 h-4 text-green-300 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <button className="w-full bg-yellow-400 text-yellow-900 font-bold py-2.5 rounded-full hover:bg-yellow-300 transition-colors cursor-pointer">
        Обновить Сайт
      </button>
    </div>
  );
}
