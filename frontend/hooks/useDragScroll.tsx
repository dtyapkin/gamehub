"use client";

import { useRef, useState, useCallback } from "react";

export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [isDragging, setIsDragging] = useState(false);

  // ref для синхронного состояния — иначе первый mousemove пропускается
  const draggingRef = useRef(false);
  const state = useRef({ startX: 0, scrollLeft: 0, moved: false });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    // только левая кнопка
    if (e.button !== 0) return;
    // тач/перо обрабатывает браузер нативно — не мешаем
    if (e.pointerType !== "mouse") return;

    const el = ref.current;
    if (!el) return;

    draggingRef.current = true;
    setIsDragging(true);
    state.current.startX = e.clientX;
    state.current.scrollLeft = el.scrollLeft;
    state.current.moved = false;

    // фиксируем указатель — события продолжат приходить, даже если мышь
    // вышла за пределы контейнера
    el.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const el = ref.current;
    if (!el) return;

    const walk = e.clientX - state.current.startX;

    // порог, чтобы случайный микросдвиг не блокировал клик
    if (Math.abs(walk) > 3) state.current.moved = true;

    if (state.current.moved) {
      e.preventDefault();
      el.scrollLeft = state.current.scrollLeft - walk;
    }
  }, []);

  const endDrag = useCallback((e: React.PointerEvent) => {
    const el = ref.current;
    if (el?.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
    draggingRef.current = false;
    setIsDragging(false);
  }, []);

  // после drag блокируем клик по ссылке/карточке
  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if (state.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      state.current.moved = false;
    }
  }, []);

  // критично: блокируем нативный drag картинок/ссылок
  const onDragStart = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  return {
    ref,
    isDragging,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onClickCapture,
      onDragStart,
    },
  };
}
