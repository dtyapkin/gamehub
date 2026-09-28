// import { NftCard } from '@/components/nft/NFTCard';
import nftsData from "@/data/nfts.json";
import { NftCard } from "../nft/NftCard";
// import AdBanner from "../adbanner/page";
// import AdBanner from "../adbanner/page";

export function RightSidebarExtra() {
  const nfts = nftsData.nfts;

  return (
    <aside className="w-75 hidden xl:flex flex-col gap-4 sticky top-4 h-fit">
      {/* Discover Banner */}
      <div className="bg-linear-to-br from-purple-700 to-indigo-900 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-black leading-tight mb-1">DISCOVER.</h2>
        <h2 className="text-2xl font-black leading-tight mb-1">PLAY.</h2>
        <h2 className="text-2xl font-black leading-tight mb-3">
          <span className="text-yellow-400">ENJOY!</span>
        </h2>
        <p className="text-sm text-white/80 mb-4">Fun • Easy • Free</p>
        <button className="bg-white text-purple-700 font-bold px-5 py-2 rounded-full text-sm hover:bg-gray-100 transition-colors flex items-center gap-2">
          <span className="text-red-500">▶</span> Play Now
        </button>
      </div>

      {/* Advertisement */}
      <div className="bg-purple-600 rounded-2xl p-8 text-center">
        <p className="text-white text-2xl font-bold">РЕКЛАМА</p>
      </div>

      {/* NFT Cards — только 2-й и 3-й NFT (первый в FeaturedNft) */}
      {/* {nfts.slice(1).map((nft) => (
        <NftCard key={nft.id} nft={nft} />
      ))} */}

      {/* Ad Banner 2 - Bottom Position */}
      {/* <AdBanner position="sidebar" className="mb-8" /> */}

      {/* Ad Banner 2 - Bottom Position */}
      {/* <AdBanner position="bottom" className="mb-8" /> */}
    </aside>
  );
}
