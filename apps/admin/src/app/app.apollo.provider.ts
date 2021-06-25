import { ApolloLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { APOLLO_OPTIONS } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";

function createApollo(httpLink: HttpLink) {
  const basic = setContext(() => ({
    headers: {
      Accept: "charset=utf-8",
    },
  }));
  const auth = setContext(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      return {};
    }
    return {
      headers: {
        Authorization: token,
      },
    };
  });
  const errorLink = onError(({ networkError, response }) => {
    if (networkError) {
      console.error("Network Error", networkError.message);
      return;
    }
    const errorMessage = response.errors[0].message;
    console.error("Apollo Error", errorMessage);
    response.errors = null;
    response.data = { errorMessage };
  });
  const link = ApolloLink.from([
    basic,
    auth,
    errorLink,
    httpLink.create({ uri: "http://localhost:3333/graphql" }),
  ]);
  const cache = new InMemoryCache();
  return {
    link,
    cache,
  };
}

export const AppApolloProvider = {
  provide: APOLLO_OPTIONS,
  useFactory: createApollo,
  deps: [HttpLink],
};
