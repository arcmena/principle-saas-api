import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "@generated/type-graphql";
import { buildSchema } from "type-graphql";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const schema = await buildSchema({
  resolvers,
  validate: false,
});

const server = new ApolloServer({ schema });

const { url } = await startStandaloneServer(server, {
  // @ts-ignore
  context: () => ({ prisma }),
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
