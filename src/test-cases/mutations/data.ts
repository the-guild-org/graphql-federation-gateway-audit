import { DurableObject } from "cloudflare:workers";
import { Env } from "../../env";

interface Product {
  id: string;
  name: string;
  price: number;
}

export class MutationsTestStorage extends DurableObject {
  async getProducts(): Promise<Product[]> {
    return (await this.ctx.storage.get("products")) ?? [];
  }

  async addProduct(name: string, price: number): Promise<Product> {
    let products = await this.getProducts();
    const newProduct = {
      id: "p-added-" + products.length,
      name: name,
      price: price,
    };
    await this.ctx.storage.put("products", products.concat(newProduct));
    return newProduct;
  }

  async initProducts() {
    const products = await this.getProducts();
    const product = {
      id: "p1",
      name: "p1-name",
      price: 9.99,
    };

    if (products.some((p) => p.id === product.id)) {
      return;
    }

    await this.ctx.storage.put("products", products.concat(product));
  }

  async deleteProduct(id: string) {
    console.log("deleting", id);
    let products = await this.getProducts();
    console.log("before", products);
    const after = products.filter((p) => p.id !== id);
    console.log("after", after);
    await this.ctx.storage.put("products", after);
  }
}

function getStub(env: Env) {
  const id = env.MUTATIONS.idFromName("two");
  return env.MUTATIONS.get(id);
}

export function getProducts(env: Env): Promise<Product[]> {
  const stub = getStub(env);
  return stub.getProducts();
}

export function addProduct(env: Env, name: string, price: number) {
  const stub = getStub(env);
  return stub.addProduct(name, price);
}

export function deleteProduct(env: Env, id: string) {
  const stub = getStub(env);
  return stub.deleteProduct(id);
}

export function initProducts(env: Env) {
  const stub = getStub(env);
  return stub.initProducts();
}
