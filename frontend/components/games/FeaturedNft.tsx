"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NftItem } from "@/types";

interface FeaturedNftProps {
  nfts: NftItem[];
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export function FeaturedNft({ nfts }: FeaturedNftProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"details" | "members" | "bids">(
    "details",
  );
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: 14,
    minutes: 17,
    seconds: 34,
  });
  const [isBidding, setIsBidding] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [showBidModal, setShowBidModal] = useState(false);

  const currentNft = nfts[currentIndex];

  // Таймер обратного отсчёта
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? nfts.length - 1 : prev - 1));
  }, [nfts.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === nfts.length - 1 ? 0 : prev + 1));
  }, [nfts.length]);

  const handleBidNow = () => {
    setShowBidModal(true);
  };

  const handleConfirmBid = () => {
    if (bidAmount && parseFloat(bidAmount) > 0) {
      setIsBidding(true);
      setTimeout(() => {
        setIsBidding(false);
        setShowBidModal(false);
        setBidAmount("");
      }, 1500);
    }
  };

  const padZero = (num: number) => num.toString().padStart(2, "0");

  const tabs = [
    { id: "details" as const, label: "Details" },
    { id: "members" as const, label: "Members" },
    { id: "bids" as const, label: "Bids" },
  ];

  return (
    <div className="relative">
      <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
        <div className="flex flex-col lg:flex-row">
          {/* Left — Image */}
          <div className="relative lg:w-[420px] xl:w-[480px] flex-shrink-0">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[300px] lg:min-h-[400px]">
              <Image
                src={currentNft.image}
                alt={currentNft.title}
                fill
                className="object-cover"
                priority
              />

              {/* Overlay gradient at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Top-left: Avatars */}
              <div className="absolute top-4 left-4 flex items-center gap-1">
                <div className="flex -space-x-2">
                  {[
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80",
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80",
                    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80",
                  ].map((avatar, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                    >
                      <Image
                        src={avatar}
                        alt={`User ${i + 1}`}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="bg-gray-800/80 backdrop-blur-sm text-white text-xs font-medium px-2 py-0.5 rounded-full ml-1">
                  20+
                </div>
              </div>

              {/* Top-right: Auction Timer */}
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2 flex flex-col items-center">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white/80 text-[10px] font-medium">
                    Auction ends in:
                  </span>
                </div>
                <div className="flex items-center gap-1 text-white font-mono text-sm font-bold">
                  <span>{padZero(timeLeft.hours)}H</span>
                  <span className="text-white/50">:</span>
                  <span>{padZero(timeLeft.minutes)}M</span>
                  <span className="text-white/50">:</span>
                  <span>{padZero(timeLeft.seconds)}S</span>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={goToPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                aria-label="Previous NFT"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                aria-label="Next NFT"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Bottom: Current Bid + Bid Now */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-xs mb-0.5">Current Bid</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-white text-2xl font-black">
                      {currentNft.price}
                    </span>
                    <span className="text-white/60 text-xs">
                      ({currentNft.priceUsd})
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleBidNow}
                  disabled={isBidding}
                  className={cn(
                    "bg-gradient-to-r from-lime-400 to-green-400 text-black font-bold px-6 py-2.5 rounded-full text-sm flex items-center gap-1.5 transition-all hover:shadow-lg hover:shadow-green-400/30 active:scale-95",
                    isBidding && "opacity-70 cursor-wait",
                  )}
                >
                  {isBidding ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Bidding...
                    </>
                  ) : (
                    <>
                      Bid Now
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right — Info */}
          <div className="flex-1 p-5 sm:p-6 lg:p-8">
            {/* Tabs */}
            <div className="flex items-center bg-gray-100 rounded-full p-1 mb-6 w-fit">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-5 py-2 rounded-full text-sm font-semibold transition-all",
                    activeTab === tab.id
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "details" && (
              <div className="animate-in fade-in duration-200">
                {/* Date */}
                {/* <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                  <Clock className="w-4 h-4" />
                  <span>{currentNft.date || "May 01, 2022, 12:01 PM"}</span>
                </div> */}

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight mb-3">
                  {currentNft.title}
                </h2>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {currentNft.description}
                </p>

                {/* Creator + Other Works */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-100">
                      <Image
                        src={currentNft.creatorAvatar}
                        alt={currentNft.creator}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Creator</p>
                      <p className="text-sm font-bold text-gray-900">
                        {currentNft.creator}
                      </p>
                    </div>
                  </div>
                  <button className="flex items-center gap-1.5 border border-gray-200 text-gray-700 font-medium px-4 py-2 rounded-full text-sm hover:bg-gray-50 transition-colors">
                    Other Works
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === "members" && (
              <div className="animate-in fade-in duration-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Collection Members
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      name: "Evgeniy Korsak",
                      role: "Creator",
                      avatar: currentNft.creatorAvatar,
                    },
                    {
                      name: "Alex Thompson",
                      role: "Member",
                      avatar:
                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80",
                    },
                    {
                      name: "Sarah Chen",
                      role: "Member",
                      avatar:
                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80",
                    },
                    {
                      name: "Mike Johnson",
                      role: "Member",
                      avatar:
                        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80",
                    },
                  ].map((member, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={member.avatar}
                          alt={member.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">
                          {member.name}
                        </p>
                        <p className="text-xs text-gray-400">{member.role}</p>
                      </div>
                      {i === 0 && (
                        <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-0.5 rounded-full">
                          Creator
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "bids" && (
              <div className="animate-in fade-in duration-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Bid History
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      user: "Alex T.",
                      amount: "1.52 ETH",
                      time: "2 min ago",
                      avatar:
                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80",
                    },
                    {
                      user: "Sarah C.",
                      amount: "1.48 ETH",
                      time: "15 min ago",
                      avatar:
                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80",
                    },
                    {
                      user: "Mike J.",
                      amount: "1.40 ETH",
                      time: "1 hour ago",
                      avatar:
                        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80",
                    },
                    {
                      user: "Emma W.",
                      amount: "1.35 ETH",
                      time: "3 hours ago",
                      avatar:
                        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80",
                    },
                  ].map((bid, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={bid.avatar}
                          alt={bid.user}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">
                          {bid.user}
                        </p>
                        <p className="text-xs text-gray-400">{bid.time}</p>
                      </div>
                      <span className="text-sm font-bold text-green-600">
                        {bid.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bid Modal */}
      {showBidModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowBidModal(false)}
          />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Place Your Bid
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Current bid:{" "}
              <span className="font-bold text-gray-900">
                {currentNft.price}
              </span>
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Your Bid (ETH)
              </label>
              <input
                type="number"
                step="0.01"
                min="1.53"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Enter amount in ETH"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-400 mt-1">
                Must be higher than current bid (1.52 ETH)
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowBidModal(false)}
                className="flex-1 border border-gray-200 text-gray-700 font-medium py-2.5 rounded-full text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBid}
                disabled={!bidAmount || parseFloat(bidAmount) <= 1.52}
                className={cn(
                  "flex-1 bg-gradient-to-r from-lime-400 to-green-400 text-black font-bold py-2.5 rounded-full text-sm transition-all",
                  !bidAmount || parseFloat(bidAmount) <= 1.52
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:shadow-lg hover:shadow-green-400/30 active:scale-95",
                )}
              >
                Confirm Bid
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
