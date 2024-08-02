export const users = [
  {
    id: "u1",
    name: "u1-name",
    username: "u1-username",
    age: 11,
  },
  {
    id: "u2",
    name: "u2-name",
    username: "u2-username",
    age: 22,
  },
];

export const accounts = [
  {
    __typename: "Admin",
    id: "u1",
    name: "Alice",
    isMain: false,
    isActive: true,
  },
  {
    __typename: "Admin",
    id: "u2",
    name: "Bob",
    isMain: true,
    isActive: true,
  },
  {
    __typename: "Regular",
    id: "u3",
    name: "Charlie",
    isMain: false,
    isActive: true,
  },
];
