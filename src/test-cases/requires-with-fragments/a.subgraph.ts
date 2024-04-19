import { createSubgraph } from "../../subgraph";
import { bazs, entities, quxs } from "./data";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.5"
        import: ["@key", "@shareable"]
      )

    type Query @shareable {
      a: Entity
    }

    type Entity @key(fields: "id") {
      id: ID!
      data: Foo
    }

    interface Foo {
      foo: String!
    }

    interface Bar implements Foo {
      foo: String!
      bar: String!
    }

    type Baz implements Foo & Bar @shareable {
      foo: String!
      bar: String!
      baz: String!
    }

    type Qux implements Foo & Bar @shareable {
      foo: String!
      bar: String!
      qux: String!
    }
  `,
  resolvers: {
    Query: {
      a() {
        return entities[1];
      },
    },
    Entity: {
      __resolveReference(key: { id: string }) {
        const entity = entities.find((e) => e.id === key.id);

        if (!entity) {
          return null;
        }

        return entity;
      },
      data(entity: { id: string; data: string }) {
        const data = entities.find((e) => e.id === entity.id)?.data;

        if (!data) {
          return null;
        }

        const baz = bazs.find((b) => b.id === data);

        if (baz) {
          return baz;
        }

        const qux = quxs.find((q) => q.id === data);

        if (qux) {
          return qux;
        }

        throw new Error("Invalid data");
      },
    },
  },
});
