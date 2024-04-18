export const users = [
  {
    id: "u1",
    username: "u-username-1",
    name: "u-name-1",
  },
  {
    id: "u2",
    username: "u-username-2",
    name: "u-name-2",
  },
];

export const products = [
  {
    upc: "p1",
    name: "p-name-1",
    price: 11,
    weight: 1,
  },
  {
    upc: "p2",
    name: "p-name-2",
    price: 22,
    weight: 2,
  },
];

export const inStock = [products[0].upc];

export const reviews = [
  {
    id: "r1",
    body: "r-body-1",
    authorId: users[0].id,
    productUpc: products[0].upc,
  },
  {
    id: "r2",
    body: "r-body-2",
    authorId: users[0].id,
    productUpc: products[1].upc,
  },
];
