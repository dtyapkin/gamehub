"use client";

import { useRef } from "react";
import { Maximize } from "lucide-react";

interface GameIframeProps {
  src: string;
  title: string;
}

export default function GameIframe({ src, title }: GameIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleFullscreen = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Стандартный API
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    }
    // Для Safari
    else if ((iframe as any).webkitRequestFullscreen) {
      (iframe as any).webkitRequestFullscreen();
    }
    // Для старых версий IE/Edge
    else if ((iframe as any).msRequestFullscreen) {
      (iframe as any).msRequestFullscreen();
    }
  };

  return (
    <div className="relative aspect-video bg-dark-light rounded-2xl overflow-hidden group">
      <iframe
        ref={iframeRef}
        src={src}
        className="w-full h-full border-none"
        allowFullScreen
        allow="fullscreen; pointer-lock"
        title={title}
      />

      {/* Кнопка полноэкранного режима */}
      <button
        onClick={handleFullscreen}
        className="absolute top-4 right-4 z-10 p-2.5 bg-black/50 backdrop-blur-md text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-black/70 hover:scale-105 active:scale-95"
        aria-label="Открыть на весь экран"
        type="button"
      >
        <Maximize className="w-5 h-5" />
      </button>
    </div>
  );
}
