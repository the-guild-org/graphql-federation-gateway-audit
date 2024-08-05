import { ApolloServer } from "@apollo/server";
import { createServer } from "node:http";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import { ApolloGateway } from "@apollo/gateway";
import { readFileSync } from "fs";

const supergraphSdl = readFileSync("./supergraph.graphql").toString();

const gateway = new ApolloGateway({
  supergraphSdl,
});

const app = express();
const httpServer = createServer(app);

const server = new ApolloServer({
  gateway,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use("/graphql", express.json(), expressMiddleware(server));
app.use("/health", (_, res) => {
  if (gateway.__testing().state.phase === "loaded") {
    res.status(200).send("OK");
  } else {
    res.status(503).send("Gateway: " + gateway.__testing().state.phase);
  }
});

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve)
);
console.log(`🚀 Server ready at http://localhost:4000/`);
