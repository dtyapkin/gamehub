"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// В YandexAd.tsx
import { IS_DEV, USE_YANDEX_ADS } from "@/lib/config";

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
  page: string;
  position: string;
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
  const pathname = usePathname();

  // Генерируем ID синхронно
  const safeBlockId = blockId.replace(/[^a-zA-Z0-9]/g, "");
  const containerId = `ya-ad-${page}-${position}-${safeBlockId}`;

  if (IS_DEV && !USE_YANDEX_ADS) {
    return (
      <div
        className={`${className} bg-slate-800/50 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-600`}
        style={{ minHeight }}
      >
        <div className="text-center">
          <p className="text-xs text-slate-400">
            Реклама: {page}/{position}
          </p>
          <p className="text-[10px] text-slate-100 font-mono">{blockId}</p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const renderAd = () => {
      const container = document.getElementById(containerId);

      if (!container) {
        return;
      }

      if (!window.Ya?.Context?.AdvManager) {
        return;
      }

      container.innerHTML = "";

      // Подавляем ошибки Яндекса для тестовых ID
      const originalConsoleError = console.error;
      console.error = function (...args) {
        if (args[0]?.includes?.("RENDER_TO_NOT_SPECIFIED")) {
          // Игнорируем эту ошибку в development
          return;
        }
        originalConsoleError.apply(console, args);
      };

      try {
        window.Ya.Context.AdvManager.render({
          blockId: blockId,
          containerId: containerId,
          async: true,
        });
      } catch (error) {
        // Игнорируем ошибки рендера для тестовых ID
      } finally {
        console.error = originalConsoleError;
      }
    };

    const timer = setTimeout(() => {
      renderAd();
    }, 200);

    return () => clearTimeout(timer);
  }, [blockId, containerId, pathname]);

  // Валидация blockId
  if (!blockId || blockId.trim() === "" || !blockId.match(/^R-A-\d+-\d+$/)) {
    // Показываем заглушку для невалидных ID
    return (
      <div
        className={`${className} rounded-2xl border-2 border-dashed border-slate-600 bg-slate-800/30 flex items-center justify-center`}
        style={{ minHeight }}
      >
        <div className="text-center p-4">
          <p className="text-xs text-slate-400 font-mono mb-1">
            {blockId || "NO ID"}
          </p>
          <p className="text-xs text-amber-400">⚠️ Тестовый ID</p>
          <p className="text-[10px] text-slate-500 mt-1">
            Замените на реальный из РСЯ
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      id={containerId}
      className={className}
      style={{
        minHeight,
        width: "100%",
      }}
    />
  );
}
