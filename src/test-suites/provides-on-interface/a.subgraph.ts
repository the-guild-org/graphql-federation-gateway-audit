import { createSubgraph } from "../../subgraph.js";
import { animals, medias, pubishPoorPlans } from "./data.js";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable", "@external", "@provides"]
      )

    type Query {
      media: Media @shareable
      book: Book @provides(fields: "animals { ... on Dog { name } }")
    }

    interface Media {
      id: ID!
    }

    interface Animal {
      id: ID!
    }

    type Book implements Media @key(fields: "id") {
      id: ID!
      animals: [Animal] @shareable
    }

    type Dog implements Animal @key(fields: "id") {
      id: ID! @external
      name: String @external
    }

    type Cat implements Animal @key(fields: "id") {
      id: ID! @external
    }
  `,
  resolvers: {
    Query: {
      media() {
        if (pubishPoorPlans) {
          throw new Error("You should be using the 'a' subgraph!");
        }

        const media = medias[0];

        return {
          __typename: media.__typename,
          id: media.id,
          animals: media.animals.map((animalId) => {
            const animal = animals.find((a) => a.id === animalId);

            if (!animal) {
              return null;
            }

            return {
              __typename: animal.__typename,
              id: animal.id,
            };
          }),
        };
      },
      book() {
        const book = medias[0];

        return {
          __typename: "Book",
          id: book.id,
          animals: book.animals.map((animalId) => {
            const animal = animals.find((a) => a.id === animalId);

            if (!animal) {
              return null;
            }

            if (animal.__typename === "Dog") {
              return {
                __typename: "Dog",
                id: animal.id,
                name: animal.name,
              };
            }

            return {
              __typename: animal.__typename,
              id: animal.id,
            };
          }),
        };
      },
    },
  },
});
