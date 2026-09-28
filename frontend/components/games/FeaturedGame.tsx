"use client";

import Image from "next/image";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import type { NftItem } from "@/types";

interface FeaturedGameProps {
  nft: NftItem;
}

export function FeaturedGame({ nft }: FeaturedGameProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
      <div className="relative">
        <Image
          src={nft.image}
          alt={nft.title}
          width={600}
          height={300}
          className="w-full h-50 md:h-62.5 object-cover"
        />
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full border-2 border-white bg-primary-light flex items-center justify-center text-[8px] text-white font-bold"
              >
                {i}
              </div>
            ))}
          </div>
          <span className="text-white text-xs ml-1">20+</span>
        </div>
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
          <Clock className="w-3 h-3 text-green-400" />
          <span className="text-white text-xs font-mono">
            {nft.auctionEnds || "14H : 17M : 34S"}
          </span>
        </div>
        <button className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 md:p-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
            <Image
              src={nft.creatorAvatar}
              alt={nft.creator}
              width={24}
              height={24}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs text-text-secondary">Creator</span>
          <span className="text-xs font-semibold">{nft.creator}</span>
        </div>

        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
          {nft.title}
        </h3>
        {/* <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {nft.description}
        </p> */}

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-text-secondary">Current Bid</p>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-green-600">
                {nft.price}
              </span>
              <span className="text-xs text-text-secondary">
                ({nft.priceUsd})
              </span>
            </div>
          </div>
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-full text-sm transition-colors flex items-center gap-1">
            Bid Now <span>›</span>
          </button>
        </div>
      </div>
    </div>
  );
}
