// TODO: temporary data until the Express endpoints are known; delete with the
// switch to apiFetch in queries.ts. Images: Lorem Picsum placeholders.
const picsum = (seed: string) => `https://picsum.photos/seed/${seed}/800/600`;

export const viaggiFixtures: unknown = [
  {
    slug: "costiera-amalfitana",
    title: "Costiera Amalfitana",
    excerpt: "Viaggio di esempio: descrizione da definire.",
    startDate: "2026-10-30",
    endDate: "2026-11-02",
    spotsAvailable: 4,
    destination: "Costiera Amalfitana",
    difficulty: "media",
    image: { src: picsum("costiera-amalfitana"), alt: "Costiera Amalfitana" },
    updatedAt: "2026-10-01T00:00:00.000Z",
  },
  {
    slug: "cilento",
    title: "Cilento",
    excerpt: "Viaggio di esempio: descrizione da definire.",
    startDate: "2026-11-13",
    endDate: "2026-11-15",
    spotsAvailable: 0,
    destination: "Cilento",
    difficulty: "facile",
    image: { src: picsum("cilento"), alt: "Cilento" },
    updatedAt: "2026-10-01T00:00:00.000Z",
  },
  {
    slug: "alta-via-delle-dolomiti",
    title: "Alta Via delle Dolomiti",
    excerpt: "Viaggio di esempio: descrizione da definire.",
    startDate: "2027-07-04",
    endDate: "2027-07-10",
    spotsAvailable: 8,
    destination: "Dolomiti",
    difficulty: "impegnativa",
    image: {
      src: picsum("alta-via-delle-dolomiti"),
      alt: "Alta Via delle Dolomiti",
    },
    updatedAt: "2026-10-01T00:00:00.000Z",
  },
  {
    slug: "parco-nazionale-d-abruzzo",
    title: "Parco Nazionale d'Abruzzo",
    excerpt: "Viaggio di esempio (già svolto): descrizione da definire.",
    startDate: "2026-09-04",
    endDate: "2026-09-06",
    spotsAvailable: 0,
    destination: "Abruzzo",
    difficulty: "media",
    image: {
      src: picsum("parco-nazionale-d-abruzzo"),
      alt: "Parco Nazionale d'Abruzzo",
    },
    updatedAt: "2026-09-07T00:00:00.000Z",
  },
];
