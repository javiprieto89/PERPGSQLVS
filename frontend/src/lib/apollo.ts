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

    // TODO Add status code when is unauthenticated
    // &&
    //   "statusCode" in networkError &&
    //   networkError.statusCode === 401

    if (unauthenticated) {
      AuthHelper.deleteToken();
      // TODO HARDCODED FOLLOWING LINE, WAITING FOR LOGOUT ENDPOINT
      window.location.reload();
      console.warn("LOGOUT, RELOAD....");
      return;
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
              AuthHelper.logout();
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
