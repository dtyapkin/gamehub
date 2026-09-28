import Link from "next/link";
import Image from "next/image";
// import {
//   //   Facebook,
//   //   Instagram,
//   //   Twitter,
//   //   Youtube,
//   //   Linkedin,
//   Music2,
//   type LucideIcon,
// } from "lucide-react";
import { FOOTER_LINKSTWO } from "@/lib/constants";

// const SOCIAL_ICONS: { icon: LucideIcon; href: string }[] = [
//   //   { icon: Facebook, href: '#' },
//   //   { icon: Instagram, href: '#' },
//   //   { icon: Twitter, href: '#' },
//   //   { icon: Youtube, href: '#' },
//   //   { icon: Linkedin, href: '#' },
//   { icon: Music2, href: "#" },
// ];

export function Footer() {
  return (
    <footer className="bg-[#2d1b69] mt-12">
      <div className="max-w-360 mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
          {/* Left CTA Banner */}
          <div className="lg:w-60 xl:w-60 shrink-0">
            {/* <div className="bg-linear-to-br from-[#6b21a8] to-[#7c3aed] rounded-3xl p-2 sm:p-2 relative overflow-hidden min-h-95 flex flex-col text-center justify-center"> */}
            {/* Decorative circles */}
            {/* <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" /> */}
            {/* <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" /> */}

            {/* Tablet Mockup */}
            <div className="bg-linear-to-br from-purple-700 to-indigo-900 rounded-2xl p-8 text-white items-center text-center justify-center">
              <div className="flex text-center justify-center mb-5">
                <Image
                  src="/logo.png"
                  //src={game.screenshots[0] || game.coverImage}
                  width={250}
                  height={150}
                  alt="logo"
                  //fill
                  sizes="auto"
                  className="object-cover w-auto h-auto"
                  //className="object-cover"
                />
              </div>
              <h2 className="text-2xl font-normal leading-tight mb-1">
                ИССЛЕДУЙ.
              </h2>
              <h2 className="text-2xl font-normal leading-tight mb-1">
                ИГРАЙ.
              </h2>
              <h2 className="text-2xl font-normal leading-tight mb-3">
                <span className="text-yellow-400">ПОБЕЖДАЙ!</span>
              </h2>
              <p className="text-sm text-white/80 mb-4">Fun • Easy • Free</p>
              {/* <div className="flex items-center justify-center">
                <button className="bg-white text-purple-700 font-bold px-5 py-2 rounded-full text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                  <span className="text-red-500">▶</span> Играть сейчас
                </button>
              </div> */}
            </div>
            {/* <div className="relative z-10 flex text-center justify-center mb-6">
                <div className="relative w-55 sm:w-65  text-center justify-center">
                  <Image
                    src="/logo.png"
                    //src={game.screenshots[0] || game.coverImage}
                    width={250}
                    height={250}
                    alt="logo"
                    //fill
                    sizes="auto"
                    className="object-cover"
                  />
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg p-2 mb-2 flex items-center justify-between">
                    <span className="text-[8px] sm:text-[10px] font-bold text-white">
                      Online App
                    </span>
                  </div>
                </div>
              </div> */}

            {/* Get Started Button */}
            {/* <div className="relative z-10 flex justify-center">
                <button className="bg-white text-[#c026d3] font-bold px-8 py-3 rounded-full text-base sm:text-lg hover:bg-gray-100 transition-colors shadow-lg">
                  Get Started
                </button>
              </div> */}
            {/* </div> */}
          </div>

          {/* Right Links Section */}
          <div className="flex-1 min-w-0 mt-5">
            {/* Links Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-6 mb-8">
              {/* Why WUPEX? */}
              {/* <div>
                <h4 className="text-white font-bold mb-3 text-sm sm:text-base">
                  Online App
                </h4>
              </div> */}

              {/* Company */}
              <div>
                <h4 className="text-white font-normal mb-3 text-sm sm:text-base">
                  Игровой портал
                </h4>
                <ul className="space-y-2">
                  {FOOTER_LINKSTWO.company.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-gray-400 text-xs sm:text-sm hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-white font-normal mb-3 text-sm sm:text-base">
                  Онлайн игры
                </h4>
                <ul className="space-y-2">
                  {FOOTER_LINKSTWO.features.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-gray-400 text-xs sm:text-sm hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-white font-normal mb-3 text-sm sm:text-base">
                  Поддержка
                </h4>
                <ul className="space-y-2">
                  {FOOTER_LINKSTWO.support.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-gray-400 text-xs sm:text-sm hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-white font-normal mb-3 text-sm sm:text-base">
                  Ресурсы
                </h4>
                <ul className="space-y-2">
                  {FOOTER_LINKSTWO.resources.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-gray-400 text-xs sm:text-sm hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Downloads */}
              <div>
                <h4 className="text-white font-normal mb-3 text-sm sm:text-base">
                  Документы
                </h4>
                <ul className="space-y-2">
                  {FOOTER_LINKSTWO.documents.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-gray-400 text-xs sm:text-sm hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <p className="text-gray-500 text-xs sm:text-sm">
                Copyright © 2026 Online App | Все права защищены.
              </p>
              <p className="text-gray-500 text-xs sm:text-sm">
                Любое использование либо копирование материалов или подборки
                материалов сайта, элементов дизайна и оформления допускается
                лишь с письменного разрешения правообладателя
              </p>

              {/* <div className="flex items-center gap-3">
                {SOCIAL_ICONS.map(({ icon: Icon, href }, i) => (
                  <Link
                    key={i}
                    href={href}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/40 transition-colors"
                    aria-label={`Social link ${i + 1}`}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Link>
                ))}
              </div> */}
            </div>
            <p className="text-gray-500 text-xs sm:text-sm mt-3">
              Используя сайт gamedome.ru, вы соглашаетесь с Пользовательским
              соглашением и Политикой конфиденциальности. Сайт предоставляется
              «как есть» для личного некоммерческого использования. Все игры
              принадлежат их правообладателям. Администрация не несёт
              ответственности за содержание игр и возможные убытки. Если вы
              правообладатель и считаете, что ваш контент размещён незаконно,
              свяжитесь с нами — мы удалим материал.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
