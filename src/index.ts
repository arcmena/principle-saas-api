import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { crudResolvers, relationResolvers } from "@generated/type-graphql";
import { buildSchema } from "type-graphql";

import MessageResolver from "./resolvers/MessageResolver";

import { context } from "./context";

const init = async () => {
  const schema = await buildSchema({
    resolvers: [...crudResolvers, ...relationResolvers, MessageResolver],
    validate: false,
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context,
  });

  console.log(`🚀  Server ready at: ${url}`);
};

init().catch(console.error);
