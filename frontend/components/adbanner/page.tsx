"use client";

import { useEffect, useState } from "react";
import YandexAd from "../yandex/YandexAd";
// import YandexAd from "./YandexAd"; // Проверьте путь!

// interface AdBannerProps {
//   position: "top" | "sidebar" | "bottom" | "infeed";
//   page: string;
//   blockId?: string;
//   className?: string;
// }

interface AdBannerProps {
  position: "top" | "sidebar_top" | "sidebar_bottom" | "bottom" | "infeed";
  page: string;
  blockId?: string;
  className?: string;
}

export default function AdBanner({
  position,
  page,
  blockId,
  className = "",
}: AdBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  // РАННИЙ ВОЗВРАТ - если blockId нет, вообще не рендерим компонент
  if (!blockId || blockId.trim() === "") {
    return null;
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  //   const positionConfig = {
  //     top: { container: "h-24 md:h-32 bg-slate-800/30", minHeight: "90px" },
  //     sidebar: { container: "h-96 bg-slate-800/30", minHeight: "600px" },
  //     bottom: { container: "h-32 bg-slate-800/30", minHeight: "90px" },
  //     infeed: { container: "h-48 md:h-64 bg-slate-800/30", minHeight: "250px" },
  //   };

  const positionConfig = {
    top: { container: "h-24 md:h-32 bg-slate-800/30", minHeight: "90px" },
    sidebar_top: { container: "h-64 bg-slate-800/30", minHeight: "250px" }, // Первый блок в сайдбаре
    sidebar_bottom: { container: "h-64 bg-slate-800/30", minHeight: "250px" }, // Второй блок (небоскреб)
    bottom: { container: "h-32 bg-slate-800/30", minHeight: "90px" },
    infeed: { container: "h-48 md:h-64 bg-slate-800/30", minHeight: "250px" },
  };

  const config = positionConfig[position];

  // Скелетон (загрузка)
  if (!isVisible) {
    return (
      <div
        className={`${config.container} ${className} rounded-2xl animate-pulse border border-slate-700/50`}
      />
    );
  }

  // Реальная реклама
  return (
    <div
      className={`${config.container} ${className} rounded-2xl relative overflow-hidden shadow-lg border border-slate-700/50`}
    >
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
