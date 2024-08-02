export const products = [
  {
    id: "p1",
    pid: "p1-pid",
    categoryId: "c1",
  },
  {
    id: "p2",
    pid: "p2-pid",
    categoryId: "c2",
  },
  {
    id: "p3",
    pid: "p3-pid",
    categoryId: "c1",
  },
];

export const categories = [
  {
    id: "c1",
    name: "c1-name",
    details: {
      products: products.filter((p) => p.categoryId === "c1").length,
    },
  },
  {
    id: "c2",
    name: "c2-name",
    details: {
      products: products.filter((p) => p.categoryId === "c2").length,
    },
  },
];
