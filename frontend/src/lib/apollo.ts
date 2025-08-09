// src/apollo/client.ts
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_API, // define esto en tu .env
  cache: new InMemoryCache(),
});

export default client;
