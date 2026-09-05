export type JournalEntry = {
  readonly date: string;
  readonly title: string;
  readonly slug: string;
};

export const JOURNAL: readonly JournalEntry[] = [
  {
    date: '2026.07.14',
    title: 'Why we stopped printing ages on our labels',
    slug: 'why-we-stopped-printing-ages',
  },
  {
    date: '2026.06.02',
    title: 'Flatlock, envelope necks, and the two seams that cause the most trouble',
    slug: 'flatlock-envelope-necks',
  },
  {
    date: '2026.04.19',
    title: 'What GOTS certification actually audits, and what it doesn’t',
    slug: 'what-gots-audits',
  },
] as const;
