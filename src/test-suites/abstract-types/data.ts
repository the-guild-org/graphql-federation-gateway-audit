export const users = [
  {
    id: "u1",
    email: "u1@example.com",
    name: "u1-name",
  },
  {
    id: "u2",
    email: "u2@example.com",
    name: "u2-name",
  },
  {
    id: "u3",
    email: "u3@example.com",
    name: "u3-name",
  },
] as const;

export const books = [
  {
    __typename: "Book",
    id: "p1",
    sku: "sku-1",
    title: "Book 1",
    createdBy: "u1",
    dimensions: {
      size: "small",
      weight: 0.5,
    },
    publisher: {
      __typename: "Self",
      email: users[0].email,
    },
    hidden: false,
  },
  {
    __typename: "Book",
    id: "p3",
    sku: "sku-3",
    title: "Book 2",
    createdBy: "u2",
    dimensions: {
      size: "small",
      weight: 0.6,
    },
    publisher: {
      __typename: "Agency",
      id: "a1",
    },
    hidden: false,
  },
];

export const magazines = [
  {
    __typename: "Magazine",
    id: "p2",
    sku: "sku-2",
    title: "Magazine 1",
    createdBy: "u1",
    dimensions: {
      size: "small",
      weight: 0.2,
    },
    publisher: {
      __typename: "Agency",
      id: "a1",
    },
    hidden: false,
  },
  {
    __typename: "Magazine",
    id: "p4",
    sku: "sku-4",
    title: "Magazine 2",
    createdBy: "u2",
    dimensions: {
      size: "small",
      weight: 0.3,
    },
    publisher: {
      __typename: "Self",
      email: users[0].email,
    },
    hidden: true,
  },
];

export const products = [...books, ...magazines] as const;

export const reviews = [
  {
    id: 1,
    body: "review 1",
    productId: "p1",
    score: 3,
  },
  {
    id: 2,
    body: "review 2",
    productId: "p1",
    score: 4,
  },
  {
    id: 3,
    body: "review 3",
    productId: "p2",
    score: 5,
  },
] as const;

export const agencies = [
  {
    id: "a1",
    companyName: "Agency 1",
    email: {
      address: 'a1@example.com'
    }
  },
] as const;
