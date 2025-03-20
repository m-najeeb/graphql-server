require("dotenv").config();
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { Request, Response } from "express";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 5000;

  app.use(express.json());

  // Create GraphQL server
  const server = new ApolloServer({
    typeDefs: `
    type Query{
    hello: String
    say(name: String): String
    }
    `,
    resolvers: {
      Query: {
        hello: () => `hello, world!`,
        say: (parent, { name }: { name: string }) =>
          `hello, ${name}, How are you?`,
      },
    },
  });

  // Start GQL server
  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.get("/", (req: Request, res: Response) => {
    res.send("Server is up and running.");
  });

  app.listen(PORT, () => {
    console.log(`Server Running on port http://localhost:${PORT}`);
  });
}

init();
