let products = [
  {
    id: "p1",
    name: "p1-name",
    price: 9.99,
  },
];

export function getProducts() {
  return products;
}

export function addProduct(name: string, price: number) {
  const newProduct = {
    id: "p-added" + (products.length + 1),
    name: name,
    price: price,
  };

  products.push(newProduct);

  return newProduct;
}

export function deleteProductAt(index: number) {
  products = products.splice(index, 1);
}
