import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import * as Auth from './data/api/middlewares/auth.middleware';
import { corsServer } from './data/api/middlewares/cors.middleware';
import { dbConnect } from './data/mongo/dbConnect';
import { typeDefs } from './data/graphql/typeDefs';
import { loggerMiddleware } from './data/api/middlewares/logger.middleware';
import { resolvers } from './data/graphql/resolvers';
import { DocumentNode } from 'graphql';

async function startApolloServer(typeDefs: DocumentNode[], resolvers: any) {
  const app = express();

  // Logger
  app.use(loggerMiddleware);

  // CORS
  app.use(corsServer());

  // auth GraphQL
  app.use(Auth.authorize(['GQL']));

  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }) => ({ user: req.user }),
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

dbConnect()
  .then(() => console.log('db connected'))
  .catch((err) => console.log(err));

startApolloServer(typeDefs, resolvers);
