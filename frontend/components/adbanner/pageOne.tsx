"use client";

import { useEffect, useState } from "react";
import YandexAd from "../yandex/YandexAd";
// import YandexAd from "./YandexAd"; // Убедитесь, что путь правильный

interface AdBannerProps {
  position: "top" | "sidebar" | "bottom" | "infeed";
  page: string; // Обязательно: для маппинга Strapi и логики Яндекса
  blockId?: string; // ID блока из Strapi (может быть undefined, если реклама отключена)
  className?: string;
}

export default function AdBanner({
  position,
  page,
  blockId,
  className = "",
}: AdBannerProps) {
  //   if (!blockId) {
  //     return null;
  //   }
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Небольшая задержка для плавного появления и имитации загрузки
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Конфигурация стилей и минимальной высоты для каждого типа баннера
  // Минимальная высота критична, чтобы YandexAd не схлопывался до загрузки
  const positionConfig = {
    top: { container: "h-24 md:h-32 bg-slate-800/30", minHeight: "90px" },
    sidebar: { container: "h-96 bg-slate-800/30", minHeight: "600px" },
    bottom: { container: "h-32 bg-slate-800/30", minHeight: "90px" },
    infeed: { container: "h-48 md:h-64 bg-slate-800/30", minHeight: "250px" },
  };

  const config = positionConfig[position];

  // Если блок не активен или ID не пришел из Strapi — ничего не рендерим
  if (!blockId) {
    return null;
  }

  // 1. Состояние загрузки (Скелетон)
  if (!isVisible) {
    return (
      <div
        className={`${config.container} ${className} rounded-2xl animate-pulse border border-slate-700/50`}
        aria-label="Загрузка рекламы"
      />
    );
  }

  // 2. Состояние с реальной рекламой
  return (
    <div
      className={`${config.container} ${className} rounded-2xl relative overflow-hidden shadow-lg border border-slate-700/50 flex flex-col items-center justify-center`}
    >
      {/* 
        ВАЖНО: Яндекс сам добавляет маркировку "Реклама" и информацию о рекламодателе.
        Добавлять свою надпись поверх опасно — это может нарушить правила модерации РСЯ.
        Мы оставляем контейнер чистым для рендера Яндекса.
      */}

      <YandexAd
        blockId={blockId}
        page={page}
        position={position}
        minHeight={config.minHeight}
        className="w-full h-full"
      />
    </div>
  );
}
