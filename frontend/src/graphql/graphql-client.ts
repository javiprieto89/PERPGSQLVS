import type { ApolloQueryResult, FetchResult } from "@apollo/client";
import type { DocumentNode } from "graphql";
import { apolloClient } from "~/lib/apollo";

/**
 * GraphQL Client wrapper that uses Apollo Client internally
 * This provides a consistent API for all services while leveraging Apollo's features:
 * - Automatic token refresh via error link
 * - Smart caching and cache invalidation
 * - Optimistic updates
 * - Better error handling
 */
class GraphQLClient {
  /**
   * Execute a GraphQL query using Apollo Client
   */
  async query<T>(
    query: DocumentNode,
    variables: Record<string, unknown> = {}
  ): Promise<T> {
    try {
      const result: ApolloQueryResult<T> = await apolloClient.query({
        query,
        variables,
        fetchPolicy: "network-only", // Always fetch fresh data
      });

      return result.data;
    } catch (error) {
      console.error("GraphQL Query Error:", error);
      throw error;
    }
  }

  /**
   * Execute a GraphQL mutation using Apollo Client
   */
  async mutation<T>(
    mutation: DocumentNode,
    variables: Record<string, unknown> = {}
  ): Promise<T> {
    try {
      const result: FetchResult<T> = await apolloClient.mutate({
        mutation,
        variables,
      });

      if (!result.data) {
        throw new Error("Mutation returned no data");
      }

      return result.data;
    } catch (error) {
      console.error("GraphQL Mutation Error:", error);
      throw error;
    }
  }

  /**
   * Check connection to GraphQL endpoint
   */
  async checkConnection(): Promise<boolean> {
    try {
      await apolloClient.query({
        query: apolloClient.cache.readQuery({ query: {} as any }) as any,
        fetchPolicy: "network-only",
      });
      return true;
    } catch (error) {
      console.error("Connection check failed:", error);
      return false;
    }
  }
}

export const graphqlClient = new GraphQLClient();
