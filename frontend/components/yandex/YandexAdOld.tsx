"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    Ya?: {
      Context?: {
        AdvManager?: {
          render: (options: Record<string, unknown>) => void;
        };
      };
    };
  }
}

interface YandexAdProps {
  blockId: string;
  page: string; // ← НОВОЕ: для отладки
  position: string; // ← НОВОЕ: для отладки
  className?: string;
  minHeight?: string;
}

export default function YandexAd({
  blockId,
  page,
  position,
  className = "",
  minHeight = "90px",
}: YandexAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!blockId) return;

    const renderAd = () => {
      if (!containerRef.current || !window.Ya?.Context?.AdvManager) return;

      // Критично: очищаем контейнер при смене маршрута
      containerRef.current.innerHTML = "";

      window.Ya.Context.AdvManager.render({
        blockId,
        node: containerRef.current,
        async: true,
      });

      // Отладочный лог (убрать в продакшене)
      if (process.env.NODE_ENV === "development") {
        console.log(
          `[РСЯ] Рендер: page="${page}", position="${position}", ` +
            `blockId="${blockId}", url="${pathname}"`,
        );
      }
    };

    if (window.Ya?.Context?.AdvManager) {
      renderAd();
    } else {
      const script = document.getElementById("yandex-ads-script");
      if (script) {
        script.addEventListener("load", renderAd);
        return () => script.removeEventListener("load", renderAd);
      }
    }
  }, [blockId, pathname, page, position]);

  if (!blockId) return null;

  return (
    <div
      ref={containerRef}
      id={`ya-ad-${page}-${position}`}
      data-page={page}
      data-position={position}
      data-block-id={blockId}
      className={`yandex-ad-container ${className}`}
      style={{ minHeight }}
    />
  );
}
