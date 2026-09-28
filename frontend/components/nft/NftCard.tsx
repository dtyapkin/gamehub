"use client";

import Image from "next/image";
import { Heart, MoreHorizontal } from "lucide-react";
import type { NftItem } from "@/types";

interface NftCardProps {
  nft: NftItem;
}

export function NftCard({ nft }: NftCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md">
      <div className="relative">
        <Image
          src={nft.image}
          alt={nft.title}
          width={400}
          height={300}
          className="w-full h-50 object-cover"
        />
        <button className="absolute top-3 left-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
          <MoreHorizontal className="w-4 h-4" />
        </button>
        <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-red-500">
          <Heart className="w-4 h-4" fill="currentColor" />
        </button>
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary overflow-hidden border-2 border-white">
            <Image
              src={nft.creatorAvatar}
              alt={nft.creator}
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-bold text-gray-900 mb-1">{nft.title}</h4>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-text-secondary">Price: {nft.price}</p>
          </div>
          <p className="text-sm font-bold text-red-500">{nft.priceUsd}</p>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 border border-gray-200 text-gray-700 font-medium py-2 rounded-full text-sm hover:bg-gray-50 transition-colors">
            History
          </button>
          <button className="flex-1 bg-blue-500 text-white font-medium py-2 rounded-full text-sm hover:bg-blue-600 transition-colors">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
