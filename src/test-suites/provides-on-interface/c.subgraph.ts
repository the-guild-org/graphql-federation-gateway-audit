import { createSubgraph } from "../../subgraph.js";
import { animals, medias, pubishPoorPlans } from "./data.js";

export default createSubgraph("c", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable"]
      )

    interface Media {
      id: ID!
      animals: [Animal]
    }

    interface Animal {
      id: ID!
      name: String
    }

    type Book implements Media @key(fields: "id") {
      id: ID!
      animals: [Animal] @shareable
    }

    type Dog implements Animal @key(fields: "id") {
      id: ID!
      name: String @shareable
      age: Int
    }

    type Cat implements Animal @key(fields: "id") {
      id: ID!
      name: String @shareable
      age: Int
    }
  `,
  resolvers: {
    Query: {
      media() {
        if (pubishPoorPlans) {
          throw new Error("You should be using the 'a' subgraph!");
        }

        return medias[0];
      },
    },
    Book: {
      __resolveReference(key: { id: string }) {
        const media = medias.find((media) => media.id === key.id);

        return media
          ? {
              __typename: "Book",
              id: media.id,
              animals: media.animals,
            }
          : null;
      },
      animals(book: { animals: string[] }) {
        return book.animals.map((animalId) => {
          const animal = animals.find((a) => a.id === animalId);

          return animal
            ? {
                __typename: animal.__typename,
                id: animal.id,
                name: animal.name,
              }
            : null;
        });
      },
    },
    Cat: {
      __resolveReference(key: { id: string }) {
        const animal = animals.find((animal) => animal.id === key.id);

        return animal
          ? {
              __typename: "Cat",
              id: animal.id,
              name: animal.name,
              age: animal.age,
            }
          : null;
      },
      age(cat: { id: string }) {
        const animal = animals.find((a) => a.id === cat.id);

        return animal ? animal.age : null;
      },
    },
    Dog: {
      __resolveReference(key: { id: string }) {
        if (pubishPoorPlans) {
          // Nothing in tests should be calling this resolver
          throw new Error("You should be using the 'c' subgraph!");
        }

        const animal = animals.find((animal) => animal.id === key.id);

        return animal
          ? {
              __typename: "Dog",
              id: animal.id,
              name: animal.name,
              age: animal.age,
            }
          : null;
      },
      age(dog: { id: string }) {
        const animal = animals.find((a) => a.id === dog.id);

        return animal ? animal.age : null;
      },
    },
  },
});
