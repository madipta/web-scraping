import { ApolloLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
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

  const link = ApolloLink.from([
    basic,
    auth,
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
