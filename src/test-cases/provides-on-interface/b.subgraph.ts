import { createSubgraph } from "../../subgraph.js";
import { animals, medias } from "./data.js";

export default createSubgraph("b", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable", "@provides", "@external"]
      )

    type Query {
      media: Media @shareable @provides(fields: "animals { id name }")
    }

    interface Media {
      id: ID!
      animals: [Animal]
    }

    interface Animal {
      id: ID!
      name: String
    }

    type Book implements Media {
      id: ID! @shareable
      animals: [Animal] @external
    }

    type Dog implements Animal {
      id: ID! @external
      name: String @external
    }

    type Cat implements Animal {
      id: ID! @external
      name: String @external
    }
  `,
  resolvers: {
    Query: {
      media() {
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
              name: animal.name,
            };
          }),
        };
      },
    },
  },
});
