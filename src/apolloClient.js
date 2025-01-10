import { ApolloClient, InMemoryCache } from "@apollo/client";
const PORT = 4000;

const client = new ApolloClient({
  uri: `http://localhost:${PORT}/graphql`,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          villages: {
            merge(existing = [], incoming) {
              return incoming || existing;
            },
          },
        },
      },
      Village: {
        keyFields: ["name"],
      },
    },
  }),
});

export default client;