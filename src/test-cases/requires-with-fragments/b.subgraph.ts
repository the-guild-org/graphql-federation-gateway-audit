import { createSubgraph } from "../../subgraph";
import { entities, bazs, quxs } from "./data";

type WithData<T> = T & {
  data: {
    foo: string;
  } & ({ bar: string; baz: string } | { bar: string; qux: string });
};
type WithFoo<T> = T & {
  data: {
    foo: string;
  };
};

export default createSubgraph("b", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.5"
        import: [
          "@key"
          "@shareable"
          "@inaccessible"
          "@external"
          "@requires"
        ]
      )

    type Query @shareable {
      b: Entity
      bb: Entity
    }

    type Entity @key(fields: "id") {
      id: ID!
      data: Foo @external
      requirer: String!
        @requires(
          fields: """
          data {
            foo
            ... on Bar {
              bar
              ... on Baz {
                baz
              }
              ... on Qux {
                qux
              }
            }
          }
          """
        )
      requirer2: String!
        @requires(
          fields: """
          data {
            ... on Foo {
              foo
            }
          }
          """
        )
    }

    interface Foo {
      foo: String!
    }

    interface Bar implements Foo {
      foo: String!
      bar: String!
    }

    type Baz implements Foo & Bar @shareable @inaccessible {
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
      b() {
        return entities[0];
      },
      bb() {
        return entities[1];
      },
    },
    Entity: {
      __resolveReference(
        key: { id: string } | WithData<{ id: string }> | WithFoo<{ id: string }>
      ) {
        const entity = entities.find((e) => e.id === key.id);

        if (!entity) {
          return null;
        }

        return {
          ...entity,
          ...key,
        };
      },
      data(entity: { id: string }) {
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
      requirer(entity: WithData<{ id: string }>) {
        console.log();
        if (!("data" in entity)) {
          throw new Error("Expected entity to have a data field");
        }

        return entity.data.foo + "_requirer";
      },
      requirer2(entity: WithFoo<{ id: string }>) {
        if (!("data" in entity)) {
          throw new Error("Expected entity to have a data field");
        }

        return entity.data.foo + "_requirer2";
      },
    },
  },
});
