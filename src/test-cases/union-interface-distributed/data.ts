export const ovens = [
  {
    __typename: "Oven",
    id: "oven1",
    warranty: 1,
  },
  {
    __typename: "Oven",
    id: "oven2",
    warranty: 2,
  },
];
export const toasters = [
  {
    __typename: "Toaster",
    id: "toaster1",
    warranty: 3,
  },
  {
    __typename: "Toaster",
    id: "toaster2",
    warranty: 4,
  },
];

export const products = [...ovens, ...toasters];
