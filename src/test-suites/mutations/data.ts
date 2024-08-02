interface Product {
  id: string;
  name: string;
  price: number;
}

let products: Product[] = [];
const numbers: Record<string, number> = {};

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function addProduct(name: string, price: number) {
  const newProduct = {
    id: "p-added-" + products.length,
    name: name,
    price: price,
  };
  products.push(newProduct);
  return newProduct;
}

export async function deleteProduct(id: string) {
  const after = products.filter((p) => p.id !== id);
  products = after;
}

export function initProducts() {
  const product = {
    id: "p1",
    name: "p1-name",
    price: 9.99,
  };

  if (products.some((p) => p.id === product.id)) {
    return;
  }

  products.push(product);
}

function getNumber(requestId: string) {
  const num = numbers[requestId];
  return num ?? 0;
}

export function addNumber(num: number, requestId: string) {
  const existingNumber = getNumber(requestId);
  const sum = existingNumber + num;
  numbers[requestId] = sum;
  return sum;
}

export function multiplyNumber(by: number, requestId: string) {
  const existingNumber = getNumber(requestId);
  const result = existingNumber * by;
  numbers[requestId] = result;
  return result;
}

export function deleteNumber(requestId: string) {
  const num = getNumber(requestId);
  if (typeof numbers[requestId] === "number") {
    delete numbers[requestId];
  }
  return num;
}
