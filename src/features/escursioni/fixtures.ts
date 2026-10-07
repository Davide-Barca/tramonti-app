// TODO: temporary data until the Express endpoints are known; delete with the
// switch to apiFetch in queries.ts. Images: Lorem Picsum placeholders.
const picsum = (seed: string) => `https://picsum.photos/seed/${seed}/800/600`;

export const escursioniFixtures: unknown = [
  {
    slug: "sentiero-degli-dei",
    title: "Sentiero degli Dei",
    excerpt: "Escursione di esempio: descrizione da definire.",
    date: "2026-10-18",
    spotsAvailable: 6,
    zone: "appennino",
    difficulty: "media",
    image: { src: picsum("sentiero-degli-dei"), alt: "Sentiero degli Dei" },
    updatedAt: "2026-10-01T00:00:00.000Z",
  },
  {
    slug: "valle-delle-ferriere",
    title: "Valle delle Ferriere",
    excerpt: "Escursione di esempio: descrizione da definire.",
    date: "2026-10-26",
    spotsAvailable: 0,
    zone: "appennino",
    difficulty: "facile",
    image: {
      src: picsum("valle-delle-ferriere"),
      alt: "Valle delle Ferriere",
    },
    updatedAt: "2026-10-01T00:00:00.000Z",
  },
  {
    slug: "tre-cime-di-lavaredo",
    title: "Giro delle Tre Cime di Lavaredo",
    excerpt: "Escursione di esempio: descrizione da definire.",
    date: "2026-11-08",
    spotsAvailable: 1,
    zone: "dolomiti",
    difficulty: "impegnativa",
    image: {
      src: picsum("tre-cime-di-lavaredo"),
      alt: "Tre Cime di Lavaredo",
    },
    updatedAt: "2026-10-01T00:00:00.000Z",
  },
  {
    slug: "lago-di-braies",
    title: "Anello del Lago di Braies",
    excerpt: "Escursione di esempio: descrizione da definire.",
    date: "2026-11-22",
    spotsAvailable: 12,
    zone: "dolomiti",
    difficulty: "facile",
    image: { src: picsum("lago-di-braies"), alt: "Lago di Braies" },
    updatedAt: "2026-10-01T00:00:00.000Z",
  },
  {
    slug: "monte-faito",
    title: "Monte Faito",
    excerpt: "Escursione di esempio (già svolta): descrizione da definire.",
    date: "2026-09-20",
    spotsAvailable: 0,
    zone: "appennino",
    difficulty: "media",
    image: { src: picsum("monte-faito"), alt: "Monte Faito" },
    updatedAt: "2026-09-21T00:00:00.000Z",
  },
];
