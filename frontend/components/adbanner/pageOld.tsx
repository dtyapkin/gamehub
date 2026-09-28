"use client";

import { useEffect, useState } from "react";

interface AdBannerProps {
  position: "top" | "sidebar" | "bottom" | "infeed";
  className?: string;
}

export default function AdBanner({ position, className = "" }: AdBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Показываем баннер после небольшой задержки
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const positions = {
    top: "h-24 bg-gradient-to-r from-blue-500 to-purple-600",
    sidebar: "h-96 bg-slate-800",
    bottom: "h-32 bg-gradient-to-r from-pink-500 to-orange-400",
    infeed: "h-48 bg-slate-700",
  };

  const labels = {
    top: "Баннер 728x90",
    sidebar: "Баннер 300x600",
    bottom: "Баннер 970x90",
    infeed: "Нативная реклама",
  };

  if (!isVisible) {
    return (
      <div
        className={`${positions[position]} ${className} rounded-2xl animate-pulse`}
      />
    );
  }

  return (
    <div
      className={`${positions[position]} ${className} rounded-2xl flex items-center justify-center relative overflow-hidden shadow-lg`}
    >
      <div className="text-center text-white p-4">
        <p className="text-xs font-bold mb-2 uppercase tracking-wider opacity-75">
          РЕКЛАМА
        </p>
        <p className="text-sm font-bold mb-1">{labels[position]}</p>
        <p className="text-xs opacity-75">
          {position === "top" && "Верхний баннер"}
          {position === "sidebar" && "Боковой баннер"}
          {position === "bottom" && "Нижний баннер"}
          {position === "infeed" && "Встроенная реклама"}
        </p>
      </div>

      {/* Здесь будет код Яндекс.РСЯ или Google AdSense */}
      {/* Пример для Яндекс:
      <ins 
        className="adfox-code"
        data-adfox-id="YOUR_ID"
        style={{display: 'block', width: '100%', height: '100%'}}
      />
      */}
    </div>
  );
}
