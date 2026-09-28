"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function FeedbackSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "idea",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Здесь добавьте вызов вашего Server Action или API роута для отправки формы
    console.log("Отправка данных:", formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-16 px-4 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2
            className="text-green-600 dark:text-green-400"
            size={40}
          />
        </div>
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">
          Сообщение отправлено!
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
          Спасибо за ваш вклад. Мы изучим ваше обращение и свяжемся с вами, если
          потребуется уточнение.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 m-5">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-4xl sm:text-5xl font-normal text-zinc-900/50 dark:text-white mb-4">
          Ваш голос формирует портал
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Мы создаем этот сайт для вас. Расскажите, чего не хватает? Авторов
          лучших идей мы награждаем бонусами и доступом к закрытому
          бета-тестированию.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white dark:bg-zinc-900/30 p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none"
      >
        <div className="grid sm:grid-cols-2 gap-5 mb-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2"
            >
              Ваше имя или никнейм
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
              placeholder="GamerPro"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2"
            >
              Email для ответа
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
              placeholder="mail@example.com"
            />
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="category"
            className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2"
          >
            Тема обращения
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all appearance-none"
          >
            <option value="idea">💡 Идея или предложение по сайту</option>
            <option value="bug">🐛 Баг / Ошибка в игре или на сайте</option>
            <option value="game_request">
              🙏 Хочу увидеть конкретную игру
            </option>
            <option value="other">💬 Другое</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2"
          >
            Ваше сообщение
          </label>
          <textarea
            id="message"
            rows={5}
            required
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all resize-none"
            placeholder="Опишите вашу идею или проблему максимально подробно..."
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all flex items-center justify-center gap-2"
        >
          <Send size={20} />
          Отправить сообщение
        </button>
      </form>
    </section>
  );
}
