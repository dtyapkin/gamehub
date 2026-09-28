// components/HeroSlider.tsx
"use client";

import { Play } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  accentColor: string;
  url: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: "/images/slide-gamer.jpg",
    title: "DISCOVER. PLAY. ENJOY!",
    subtitle: "Fun • Easy • Free",
    accentColor: "text-yellow-400",
    url: "/games",
  },
  {
    id: 2,
    image: "/images/slide-fantasy.jpg",
    title: "EPIC ADVENTURES AWAIT",
    subtitle: "Battle • Explore • Conquer",
    accentColor: "text-cyan-400",
    url: "/games",
  },
  {
    id: 3,
    image: "/images/slide-racing.jpg",
    title: "RACE TO VICTORY",
    subtitle: "Speed • Thrill • Glory",
    accentColor: "text-orange-400",
    url: "/games",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isHovered, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(diff) > 50) {
      diff > 0 ? prevSlide() : nextSlide();
    }
    setTouchStart(null);
  };

  const getWords = (title: string, accentColor: string) => {
    const words = title.split(" ");
    return words.map((word, i) => (
      <span
        key={i}
        className={`block ${i === words.length - 1 ? accentColor : ""}`}
      >
        {word}
      </span>
    ));
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl shadow-xl group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Слайды */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative w-full shrink-0 aspect-[16/9] sm:aspect-[2/1] md:aspect-[21/9]"
          >
            {/* Изображение */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Градиентные оверлеи */}
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/20" />

            {/* Контент слайда */}
            <div className="absolute inset-0 flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-16">
              {/* Заголовок */}
              <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-[1.1] tracking-tight max-w-[60%] sm:max-w-[55%]">
                {getWords(slide.title, slide.accentColor)}
              </h2>

              {/* Подзаголовок */}
              <p className="mt-1.5 sm:mt-2 md:mt-3 text-white/80 text-xs sm:text-sm md:text-base font-medium">
                {slide.subtitle}
              </p>
              {/* <Link
                href={slide.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-primary text-white font-bold py-4 rounded-2xl text-center hover:opacity-90 transition-opacity shadow-lg shadow-primary/30 text-lg"
              >
                <Play className="w-6 h-6 inline mr-2" fill="currentColor" />{" "}
                Играть
              </Link> */}

              {/* Кнопка Играть — под текстом, слева */}
              {/* <button className="mt-3 sm:mt-4 md:mt-5 inline-flex items-center gap-1.5 sm:gap-2 bg-white/95 text-gray-900 font-bold px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-lg text-xs sm:text-sm md:text-base">
                <span className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white ml-[1px]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </span>
                Играть
              </button> */}

              {/* <button className="mt-2 sm:mt-3 md:mt-4 inline-flex items-center gap-1.5 sm:gap-2 bg-white/95 text-gray-900 font-bold px-3.5 py-1.5 sm:px-5 sm:py-2 md:px-6 md:py-2.5 rounded-full hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-lg text-xs sm:text-sm md:text-base mr-auto ">
                <span className="w-4 h-4 sm:w-5 sm:h-5 bg-linear-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center shrink-0">
                  
                  <svg
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white ml-px"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </span>
                Играть
              </button> */}
            </div>
          </div>
        ))}
      </div>

      {/* Стрелки навигации — desktop */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-3 lg:left-5 top-1/2 -translate-y-1/2 w-9 h-9 lg:w-10 lg:h-10 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 border border-white/30"
        aria-label="Предыдущий слайд"
      >
        <svg
          className="w-4 h-4 lg:w-5 lg:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-3 lg:right-5 top-1/2 -translate-y-1/2 w-9 h-9 lg:w-10 lg:h-10 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 border border-white/30"
        aria-label="Следующий слайд"
      >
        <svg
          className="w-4 h-4 lg:w-5 lg:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Индикаторы */}
      <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "bg-white w-6 sm:w-8"
                : "bg-white/40 hover:bg-white/60 w-1.5 sm:w-2"
            }`}
            aria-label={`Перейти к слайду ${i + 1}`}
          />
        ))}
      </div>

      {/* Счётчик */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-5 md:right-5 bg-black/40 backdrop-blur-sm text-white text-[10px] sm:text-xs font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-white/20">
        {current + 1} / {slides.length}
      </div>
    </div>
  );
}
