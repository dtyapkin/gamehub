import nftsData from "@/data/nfts.json";
import AdBanner from "../adbanner/page";
import { getAdsForPage } from "@/lib/strapiAds";

interface RightSidebarProps {
  page?: string;
}

export async function RightSidebar({ page = "home" }: RightSidebarProps) {
  const ads = await getAdsForPage(page);
  const nfts = nftsData.nfts;

  return (
    <aside className="w-75 hidden xl:flex flex-col gap-4 sticky top-4 h-fit">
      {/* Discover Banner */}
      {/* <div className="bg-linear-to-br from-purple-700 to-indigo-900 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-black leading-tight mb-1">DISCOVER.</h2>
        <h2 className="text-2xl font-black leading-tight mb-1">PLAY.</h2>
        <h2 className="text-2xl font-black leading-tight mb-3">
          <span className="text-yellow-400">ENJOY!</span>
        </h2>
        <p className="text-sm text-white/80 mb-4">Fun • Easy • Free</p>
        <button className="bg-white text-purple-700 font-bold px-5 py-2 rounded-full text-sm hover:bg-gray-100 transition-colors flex items-center gap-2">
          <span className="text-red-500">▶</span> Play Now
        </button>
      </div> */}

      {/* ПЕРВЫЙ рекламный блок в сайдбаре */}
      {ads.sidebar_top && (
        <AdBanner
          position="sidebar_top"
          page={page}
          blockId={ads.sidebar_top}
          className="w-full"
        />
      )}

      {/* NFT Cards (опционально, можно вставить между блоками) */}
      {/* {nfts.slice(1, 3).map((nft) => (
        <NftCard key={nft.id} nft={nft} />
      ))} */}

      {/* ВТОРОЙ рекламный блок в сайдбаре */}
      {ads.sidebar_bottom && (
        <AdBanner
          position="sidebar_bottom"
          page={page}
          blockId={ads.sidebar_bottom}
          className="w-full"
        />
      )}
    </aside>
  );
}
