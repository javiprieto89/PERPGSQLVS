// src/apollo/client.ts
import { ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_API, // define esto en tu .env
  cache: cache,
  connectToDevTools: true,
});

export default client;
