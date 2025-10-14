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
import { refreshToken } from "~/utils/api-fetch";
import { AuthHelper } from "~/utils/authHelper";
import { Referrer } from "~/utils/referrer.session";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_API,
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  const token = AuthHelper.getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    console.log({ graphQLErrors, networkError, operation, forward });
    console.log("-------------");
    const unauthenticated =
      graphQLErrors?.some(
        (err) => err.extensions?.code === "UNAUTHENTICATED"
      ) || networkError;

    // Save current URL to return after login
    Referrer.save(window.location.href);

    // TODO Add status code when is unauthenticated
    // &&
    //   "statusCode" in networkError &&
    //   networkError.statusCode === 401

    if (unauthenticated) {
      console.warn("Unauthenticated, refreshing token...");

      return new Observable((observer) => {
        refreshToken()
          .then((success) => {
            if (success) {
              const oldHeaders = operation.getContext().headers;
              const newToken = AuthHelper.getToken();

              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: newToken ? `Bearer ${newToken}` : "",
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
              window.location.href = "/login";
            }
          })
          .catch((error) => {
            observer.error(error);
            console.error("Refresh token error:", error);
            window.location.href = "/login";
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
