export type Category = {
  readonly name: string;
  readonly slug: string;
  readonly pieces: number;
};

export const CATEGORIES: readonly Category[] = [
  { name: 'Bodysuits', slug: 'bodysuits', pieces: 6 },
  { name: 'Sleepsuits', slug: 'sleepsuits', pieces: 4 },
  { name: 'Tees & tops', slug: 'tees-tops', pieces: 5 },
  { name: 'Shorts & bottoms', slug: 'shorts-bottoms', pieces: 4 },
  { name: 'Vests', slug: 'vests', pieces: 3 },
  { name: 'Underwear', slug: 'underwear', pieces: 2 },
  { name: 'Socks & mittens', slug: 'socks-mittens', pieces: 3 },
] as const;
