import { print, type DocumentNode } from "graphql";
import {
  devError,
  devLog,
  devWarn,
  getAuthHeader,
  getAuthToken,
  handleAuthError,
  hasAuthErrors,
  isAuthError,
} from "~/utils/auth-middleware";

const CLIENT_NAME = "GraphQL Client";

class GraphQLClient {
  endpoint: string;

  constructor() {
    this.endpoint = import.meta.env.VITE_GRAPHQL_API as string;
  }

  /**
   * Build request headers with authentication
   */
  private buildHeaders(): HeadersInit {
    return {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    };
  }

  /**
   * Parse and validate response
   */
  private async parseResponse(response: Response): Promise<unknown> {
    const contentType = response.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      const responseText = await response.text();
      devError(CLIENT_NAME, "Invalid Content-Type:", contentType);
      throw new Error(
        `Expected JSON but got ${contentType}. Response: ${responseText.substring(
          0,
          500
        )}...`
      );
    }

    const responseText = await response.text();

    try {
      return JSON.parse(responseText);
    } catch (parseError) {
      devError(CLIENT_NAME, "JSON Parse Error:", parseError);
      throw new Error(`Failed to parse JSON: ${(parseError as Error).message}`);
    }
  }

  /**
   * Handle HTTP error responses
   */
  private async handleHttpError(response: Response): Promise<void> {
    const errorText = await response.text();
    console.error("HTTP Error Response:", errorText);
    throw new Error(
      `HTTP ${response.status}: ${response.statusText}\n${errorText}`
    );
  }

  /**
   * Check if error is a network/connection error
   */
  private isNetworkError(error: unknown): boolean {
    return (
      error instanceof Error &&
      error.name === "TypeError" &&
      error.message.includes("fetch")
    );
  }

  /**
   * Attempt token refresh and retry the request
   */
  private async attemptRefreshAndRetry<T extends {}>(
    operation: string | DocumentNode,
    variables: Record<string, unknown>,
    fetchOptions: RequestInit,
    context: string
  ): Promise<T | null> {
    devWarn(CLIENT_NAME, `${context}, attempting token refresh...`);

    const refreshSuccess = await handleAuthError(CLIENT_NAME);

    if (refreshSuccess) {
      devLog(CLIENT_NAME, "Retrying request with new token...");
      return this.executeRequest<T>(operation, variables, fetchOptions, true);
    }

    return null;
  }
  /**
   * Execute a GraphQL query or mutation with automatic token refresh on auth errors
   */
  private async executeRequest<T extends {}>(
    operation: string | DocumentNode,
    variables: Record<string, unknown> = {},
    fetchOptions: RequestInit = {},
    isRetry = false
  ): Promise<T> {
    // Convert DocumentNode to string if necessary
    const queryString =
      typeof operation === "string" ? operation : print(operation);

    devLog(CLIENT_NAME, "GraphQL Request:", {
      endpoint: this.endpoint,
      query: queryString.substring(0, 100) + "...",
      variables,
      hasToken: !!getAuthToken(),
      isRetry,
    });

    try {
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: this.buildHeaders(),
        body: JSON.stringify({
          query: queryString,
          variables,
        }),
        ...fetchOptions,
      });

      devLog(
        CLIENT_NAME,
        `Response Status: ${response.status} ${response.statusText}`
      );

      // Handle HTTP 401 (before parsing body)
      if (response.status === 401 && !isRetry) {
        const retryResult = await this.attemptRefreshAndRetry<T>(
          operation,
          variables,
          fetchOptions,
          "Received 401"
        );
        if (retryResult !== null) return retryResult;
        throw new Error("Authentication failed. Please login again.");
      }

      // Handle other HTTP errors
      if (!response.ok) {
        await this.handleHttpError(response);
      }

      // Parse response
      const result = await this.parseResponse(response);

      devLog(CLIENT_NAME, "GraphQL Response:", result);

      // Check for GraphQL authentication errors
      if (hasAuthErrors(result as any) && !isRetry) {
        const retryResult = await this.attemptRefreshAndRetry<T>(
          operation,
          variables,
          fetchOptions,
          "GraphQL auth error detected"
        );
        if (retryResult !== null) return retryResult;

        // Refresh failed, throw the original error
        const graphQLResult = result as { errors: Array<{ message: string }> };
        throw new Error(
          `GraphQL Error: ${graphQLResult.errors[0].message}. Authentication failed.`
        );
      }

      // Check for other GraphQL errors
      const graphQLResult = result as {
        errors?: Array<{ message: string }>;
        data?: T;
      };
      if (graphQLResult.errors && graphQLResult.errors.length > 0) {
        console.error("GraphQL Errors:", graphQLResult.errors);
        throw new Error(`GraphQL Error: ${graphQLResult.errors[0].message}`);
      }

      return graphQLResult.data as T;
    } catch (error) {
      // Network/connection errors
      if (this.isNetworkError(error)) {
        throw new Error(
          `No se pudo conectar al servidor GraphQL en ${this.endpoint}. Verifica que el servidor esté ejecutándose.`
        );
      }

      // Auth errors (if not already handled)
      if (isAuthError(error) && !isRetry) {
        const retryResult = await this.attemptRefreshAndRetry<T>(
          operation,
          variables,
          fetchOptions,
          "Auth error in catch block"
        );
        if (retryResult !== null) return retryResult;
      }

      // Re-throw other errors
      console.error("GraphQL Client Error:", error);
      throw error;
    }
  }

  /**
   * Execute a GraphQL query
   */
  async query<T extends {}>(
    query: string | DocumentNode,
    variables: Record<string, unknown> = {},
    fetchOptions: RequestInit = {}
  ): Promise<T> {
    return this.executeRequest<T>(query, variables, fetchOptions);
  }

  /**
   * Execute a GraphQL mutation
   */
  async mutation<T extends {}>(
    mutation: string | DocumentNode,
    variables: Record<string, unknown> = {},
    fetchOptions: RequestInit = {}
  ): Promise<T> {
    return this.executeRequest<T>(mutation, variables, fetchOptions);
  }

  /**
   * Check connection to GraphQL endpoint
   */
  async checkConnection(): Promise<boolean> {
    try {
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `query { __typename }`,
        }),
      });

      devLog(CLIENT_NAME, `Connection check: ${response.status}`);
      return response.status === 200;
    } catch (error) {
      console.error("Connection check failed:", error);
      return false;
    }
  }
}

export const graphqlClient = new GraphQLClient();
