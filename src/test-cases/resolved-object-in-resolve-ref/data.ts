export const data: {
  a: Record<string, { id: string; name: string }>;
  b: Record<string, { id: string; favouriteAs: string[] }>;
} = {
  a: {
    "1": { id: "1", name: "a.1" },
    "2": { id: "2", name: "a.2" },
  },
  b: {
    "100": { id: "100", favouriteAs: ["1"] },
    "200": { id: "200", favouriteAs: ["1", "2"] },
  },
};
