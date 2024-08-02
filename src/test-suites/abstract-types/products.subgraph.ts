import { createSubgraph } from "../../subgraph.js";
import { books, magazines, products, users } from "./data.js";

export default createSubgraph("products", {
  typeDefs: /* GraphQL */ `
    schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable", "@inaccessible", "@external"]
      ) {
      query: Query
    }

    type Query {
      products: [Product]
      similar(id: ID!): [Product]
    }

    interface Product {
      id: ID!
      sku: String
      dimensions: ProductDimension
      createdBy: User
      hidden: Boolean @inaccessible
    }

    interface Similar {
      similar: [Product]
    }

    type ProductDimension @shareable {
      size: String
      weight: Float
    }

    type Book implements Product & Similar @key(fields: "id") {
      id: ID!
      sku: String
      dimensions: ProductDimension @shareable
      createdBy: User
      similar: [Book]
      hidden: Boolean
      publisherType: PublisherType
    }

    type Magazine implements Product & Similar @key(fields: "id") {
      id: ID!
      sku: String
      dimensions: ProductDimension @shareable
      createdBy: User
      similar: [Magazine]
      hidden: Boolean
      publisherType: PublisherType
    }

    union PublisherType = Agency | Self

    type Agency {
      id: ID! @shareable
    }

    type Self {
      email: String
    }

    type User @key(fields: "email") {
      email: ID!
      totalProductsCreated: Int @shareable
    }
  `,
  resolvers: {
    Query: {
      products() {
        return products.map((p) => ({
          __typename: p.__typename,
          id: p.id,
          sku: p.sku,
          dimensions: p.dimensions,
          createdBy: p.createdBy,
          hidden: p.hidden,
          publisherType: p.publisher,
        }));
      },
      similar(_: {}, { id }: { id: string }) {
        const product = products.find((product) => product.id === id);

        if (!product) {
          return [];
        }

        const similar = products.filter(
          (p) => p.id !== product.id && p.__typename === product.__typename,
        );

        return similar.map((b) => ({
          __typename: b.__typename,
          id: b.id,
          sku: b.sku,
          dimensions: b.dimensions,
          createdBy: b.createdBy,
          hidden: b.hidden,
          publisherType: b.publisher,
        }));
      },
    },
    Book: {
      __resolveReference(key: { id: string }) {
        const book = books.find((book) => book.id === key.id);

        return book
          ? {
              __typename: book.__typename,
              id: book.id,
              sku: book.sku,
              dimensions: book.dimensions,
              createdBy: book.createdBy,
              hidden: book.hidden,
              publisherType: book.publisher,
            }
          : null;
      },
      similar(book: { id: string }) {
        return books
          .filter((b) => b.id !== book.id)
          .map((b) => ({
            __typename: b.__typename,
            id: b.id,
            sku: b.sku,
            dimensions: b.dimensions,
            createdBy: b.createdBy,
            hidden: b.hidden,
            publisherType: b.publisher,
          }));
      },
      createdBy(book: { createdBy: string }) {
        const user = users.find((user) => user.id === book.createdBy);
        return user
          ? {
              __typename: "User",
              id: user.id,
              email: user.email,
            }
          : null;
      },
    },
    Magazine: {
      __resolveReference(key: { id: string }) {
        const magazine = magazines.find((magazine) => magazine.id === key.id);

        return magazine
          ? {
              __typename: magazine.__typename,
              id: magazine.id,
              sku: magazine.sku,
              dimensions: magazine.dimensions,
              createdBy: magazine.createdBy,
              hidden: magazine.hidden,
              publisherType: magazine.publisher,
            }
          : null;
      },
      similar(magazine: { id: string }) {
        return magazines
          .filter((m) => m.id !== magazine.id)
          .map((m) => ({
            __typename: m.__typename,
            id: m.id,
            sku: m.sku,
            dimensions: m.dimensions,
            createdBy: m.createdBy,
            hidden: m.hidden,
            publisherType: m.publisher,
          }));
      },
      createdBy(magazine: { createdBy: string }) {
        const user = users.find((user) => user.id === magazine.createdBy);
        return user
          ? {
              __typename: "User",
              id: user.id,
              email: user.email,
            }
          : null;
      },
    },
    User: {
      __resolveReference(key: { email: string }) {
        const user = users.find((user) => user.email === key.email);

        return user
          ? {
              __typename: "User",
              id: user.id,
              email: user.email,
            }
          : null;
      },
      totalProductsCreated(user: { id: string }) {
        return products.filter((product) => product.createdBy === user.id)
          .length;
      },
    },
  },
});
