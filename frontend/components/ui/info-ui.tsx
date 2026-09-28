"use client";

import { useState } from "react";
import { ChevronDown, CheckCircle2 } from "lucide-react";

// --- Аккордеон для FAQ ---
export function AccordionItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/50 backdrop-blur-sm transition-colors hover:border-violet-500/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-zinc-900 dark:text-white pr-4">
          {question}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-zinc-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-violet-500" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="p-5 pt-0 text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

// --- Карточка преимущества ---
export function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-violet-500/30 transition-all duration-300">
      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-violet-500/20">
        {icon}
      </div>
      <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

// --- Карточка партнерства ---
export function PartnershipCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-4 p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-violet-500/30 transition-all">
      <div className="shrink-0 w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400 mt-1">
        <CheckCircle2 size={20} />
      </div>
      <div>
        <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}

export function PartnershipCardTwo({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  const lines = desc.split("\n");

  return (
    <div className="flex gap-4 p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-violet-500/30 transition-all">
      <div className="shrink-0 w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400 mt-1">
        <CheckCircle2 size={20} />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">
          {title}
        </h3>
        <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-2">
          {lines.map((line, i) =>
            line.trim() === "" ? (
              <div key={i} className="h-2" />
            ) : (
              <p key={i}>{line}</p>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
