// src/apollo/client.ts
import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { Observable } from "@apollo/client/utilities";
import {
  handleAuthError,
  hasGraphQLAuthErrors,
  getAuthToken,
  getAuthHeader,
} from "~/utils/auth-middleware";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_API,
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      ...getAuthHeader(),
    },
  };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (import.meta.env.DEV) {
      console.log("[Apollo Client] Error:", { graphQLErrors, networkError });
    }

    // Check for authentication errors
    const unauthenticated = hasGraphQLAuthErrors(graphQLErrors) || networkError;

    if (unauthenticated) {
      console.warn("[Apollo Client] Unauthenticated, refreshing token...");

      return new Observable((observer) => {
        handleAuthError("Apollo Client")
          .then((success) => {
            if (success) {
              const oldHeaders = operation.getContext().headers;

              operation.setContext({
                headers: {
                  ...oldHeaders,
                  ...getAuthHeader(),
                },
              });

              const subscriber = {
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              };

              forward(operation).subscribe(subscriber);
            } else {
              observer.error(new Error("Unable to refresh token"));
            }
          })
          .catch((error) => {
            observer.error(error);
          });
      });
    }
  }
);

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: import.meta.env.PROD !== true,
});

export default client;
