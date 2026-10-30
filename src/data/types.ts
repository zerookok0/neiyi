import type { GarmentKind } from '../components/GarmentArt';

export type Audience = 'women' | 'men';

export type CategoryId =
  | 'ao-nguc'
  | 'quan-lot-nu'
  | 'do-mac-nha-nu'
  | 'dinh-hinh'
  | 'ao-lot-nam'
  | 'quan-lot-nam'
  | 'ao-thun-nam'
  | 'do-mac-nha-nam';

export type ColorOption = { id: string; name: string; hex: string };

export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  audience: Audience;
  categoryId: CategoryId;
  collectionId: string;
  price: number;
  compareAtPrice?: number;
  garment: GarmentKind;
  colors: ColorOption[];
  sizes: string[];
  rating: number;
  reviewCount: number;
  badge?: string;
  isBestSeller?: boolean;
  isNew?: boolean;
  shortDescription: string;
  description: string;
  materials: string[];
  care: string[];
  support: string;
  /** Editorial lifestyle shot shown beside the artwork. */
  lifestyle?: string;
};

export type Category = {
  id: CategoryId;
  name: string;
  slug: string;
  audience: Audience;
  tagline: string;
  description: string;
  garment: GarmentKind;
  color: string;
  image?: string;
};

export type Collection = {
  id: string;
  name: string;
  kicker: string;
  description: string;
};

/** Pexels editorial imagery (link-only, never downloaded). */
export const px = (id: number, w = 900) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

/**
 * Verified-reachable editorial imagery. Every product's *garment* is drawn in
 * GarmentArt, so these are used only for mood, texture and lifestyle context.
 */
export const IMG = {
  // Fabric / material studies
  textile1: px(4464829, 1200),
  textile2: px(7312099, 1200),
  textile3: px(3738088, 1200),
  textile4: px(4202325, 1200),
  // Lifestyle / mood
  mood1: px(6143822, 1200),
  mood2: px(6311623, 1200),
  mood3: px(6388732, 1200),
  mood4: px(1055691, 1200),
  mood5: px(7940629, 1200),
  mood6: px(2681751, 1200),
  mood7: px(7148421, 1200),
  mood8: px(6143821, 1200),
};

export const AUDIENCE_LABEL: Record<Audience, string> = {
  women: 'Nữ',
  men: 'Nam',
};
