// import { ReactNode } from "react";

// export interface Game {
//   id: string;
//   slug: string;
//   title: string;
//   titleRu: string;
//   description: string;
//   descriptionRu: string;
//   shortDescription: string;
//   thumbnail: string;
//   coverImage: string;
//   screenshots: string[];
//   category: string;
//   categories: string[];
//   tags: string[];
//   rating: number;
//   ratingCount: number;
//   plays: number;
//   likes: number;
//   developer: string;
//   publisher: string;
//   releaseDate: string;
//   lastUpdated: string;
//   url: string;
//   embedUrl: string;
//   platforms: string[];
//   ageRating: string;
//   languages: string[];
//   fileSize: string;
//   isTrending: boolean;
//   isNew: boolean;
//   isPopular: boolean;
//   isFeatured: boolean;
//   price: string;
//   currency: string;
// }

// export interface Category {
//   id: string;
//   slug: string;
//   name: string;
//   nameRu: string;
//   icon: string;
//   color: string;
//   description: string;
//   gameCount: number;
// }

// export interface NftItem {
//   description: ReactNode;
//   id: string;
//   title: string;
//   image: string;
//   price: string;
//   priceUsd: string;
//   creator: string;
//   creatorAvatar: string;
//   history: number[];
// }

// export interface NavItem {
//   id: string;
//   label: string;
//   labelRu: string;
//   icon: string;
//   href: string;
//   badge?: string;
// }

export interface Game {
  id: string;
  slug: string;
  title: string;
  titleRu: string;
  description: string;
  descriptionRu: string;
  shortDescription: string;
  thumbnail: string;
  coverImage: string;
  screenshots: string[];
  category: string;
  categories: string[];
  tags: string[];
  rating: number;
  ratingCount: number;
  plays: number;
  likes: number;
  developer: string;
  publisher: string;
  releaseDate: string;
  lastUpdated: string;
  url: string;
  embedUrl: string;
  platforms: string[];
  ageRating: string;
  languages: string[];
  fileSize: string;
  isTrending: boolean;
  isNew: boolean;
  isPopular: boolean;
  isFeatured: boolean;
  price: string;
  currency: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  nameRu: string;
  icon: string;
  color: string;
  description: string;
  gameCount: number;
}

// Интерфейс ставки (bid)
export interface NftBid {
  user: string;
  amount: string;
  time: string;
}

// Интерфейс NFT-элемента коллекции
export interface NftItem {
  id: string;
  title: string;
  image: string;
  price: string;
  priceUsd: string;
  creator: string;
  creatorAvatar: string;
  auctionEnds: string;
  description: string;
  date: string;
  members: number;
  bids: NftBid[];
  /** @deprecated Используется в старых карточках NftCard, можно удалить */
  history?: number[];
}

export interface NavItem {
  id: string;
  label: string;
  labelRu: string;
  icon: string;
  href: string;
  badge?: string;
}