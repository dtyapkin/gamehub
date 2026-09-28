export default function GameCardTwo() {
  return (
    <a
      href="https://poki.com/ru/g/level-devil"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10"
    >
      {/* Фоновое изображение (скриншот игры) */}
      <div className="aspect-video w-full bg-zinc-800 relative">
        <img
          src="/level-devil-preview.jpg"
          alt="Level Devil Preview"
          className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
        />
        {/* Иконка "Открыть" */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-white/10 p-4 backdrop-blur-sm transition-transform group-hover:scale-110">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">Level Devil</h3>
        <p className="text-sm text-zinc-400">
          Нажмите, чтобы играть на Poki.com
        </p>
      </div>
    </a>
  );
}
