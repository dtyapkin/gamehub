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
import { FOOTER_LINKSTHREE } from "@/lib/constants";

// const SOCIAL_ICONS: { icon: LucideIcon; href: string }[] = [
//   //   { icon: Facebook, href: '#' },
//   //   { icon: Instagram, href: '#' },
//   //   { icon: Twitter, href: '#' },
//   //   { icon: Youtube, href: '#' },
//   //   { icon: Linkedin, href: '#' },
//   { icon: Music2, href: "#" },
// ];

// const PARTNERS_LIST = [
//   ["Apple", "Yalla"],
//   ["PSN", "Ludo"],
//   ["Razer", "FC"],
//   //   ["Gold", "Mobile"],
//   //   ["Xbox", "Freefire"],
//   //   ["PUBG", ""],
//   //   ["Steam", ""],
//   //   ["Jawaker", ""],
//   //   ["Roblox", ""],
//   //   ["Fornite", ""],
//   //   ["Minecraft", ""],
// ];

export function Footer() {
  return (
    <footer className="bg-[#2d1b69] mt-12">
      <div className="max-w-360 mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left CTA Banner */}
          <div className="lg:w-75 xl:w-85 shrink-0">
            <div className="bg-linear-to-br from-[#6b21a8] to-[#7c3aed] rounded-3xl p-6 sm:p-8 relative overflow-hidden min-h-95 flex flex-col justify-between">
              {/* Decorative circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />

              {/* Tablet Mockup */}
              <div className="relative z-10 flex justify-center mb-6">
                <div className="relative w-55 sm:w-65">
                  {/* Tablet frame */}
                  <div className="bg-black rounded-2xl p-2 shadow-2xl">
                    <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-[#1a0a3e]">
                      {/* Screen content mockup */}
                      <div className="absolute inset-0 bg-linear-to-b from-purple-600 to-indigo-900 p-3">
                        {/* Top bar */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                          </div>
                          <div className="w-12 h-2 bg-white/20 rounded-full" />
                        </div>

                        {/* Banner */}
                        <div className="bg-linear-to-r from-pink-500 to-purple-600 rounded-lg p-2 mb-2 flex items-center justify-between">
                          <span className="text-[8px] sm:text-[10px] font-bold text-white">
                            FASTER
                          </span>
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white/20 rounded-full flex items-center justify-center">
                            <span className="text-[6px] sm:text-[8px]">🎮</span>
                          </div>
                          <span className="text-[8px] sm:text-[10px] font-bold text-white">
                            SEAMLESS
                          </span>
                        </div>

                        {/* Game grid */}
                        <div className="grid grid-cols-4 gap-1">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div
                              key={i}
                              className="aspect-square rounded-sm"
                              style={{
                                backgroundColor: `hsl(${260 + i * 8}, ${60 + i * 3}%, ${25 + i * 4}%)`,
                              }}
                            />
                          ))}
                        </div>

                        {/* Bottom nav */}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm px-2 py-1.5 flex justify-around">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-3 h-3 rounded-sm ${
                                i === 0 ? "bg-purple-400" : "bg-white/20"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Get Started Button */}
              <div className="relative z-10 flex justify-center">
                <button className="bg-white text-[#c026d3] font-bold px-8 py-3 rounded-full text-base sm:text-lg hover:bg-gray-100 transition-colors shadow-lg">
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Right Links Section */}
          <div className="flex-1 min-w-0">
            {/* Links Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-6 mb-8">
              {/* Why WUPEX? */}
              {/* <div>
                <h4 className="text-white font-bold mb-3 text-sm sm:text-base">
                  Online App
                </h4>
              </div> */}

              {/* Company */}
              <div>
                <h4 className="text-white font-bold mb-3 text-sm sm:text-base">
                  Игровой портал
                </h4>
                <ul className="space-y-2">
                  {FOOTER_LINKSTHREE.company.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-white font-bold mb-3 text-sm sm:text-base">
                  Онлайн игры
                </h4>
                <ul className="space-y-2">
                  {FOOTER_LINKSTHREE.features.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-white font-bold mb-3 text-sm sm:text-base">
                  Поддержка
                </h4>
                <ul className="space-y-2">
                  {FOOTER_LINKSTHREE.support.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-white font-bold mb-3 text-sm sm:text-base">
                  Ресурсы
                </h4>
                <ul className="space-y-2">
                  {FOOTER_LINKSTHREE.resources.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Downloads */}
              <div>
                <h4 className="text-white font-bold mb-3 text-sm sm:text-base">
                  Документы
                </h4>
                <ul className="space-y-2">
                  {FOOTER_LINKSTHREE.downloads.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors"
                      >
                        {link}
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
          </div>
        </div>
      </div>
    </footer>
  );
}
