import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
const PORT = 4000;

const client = new ApolloClient({
  link: new HttpLink({
    uri: `http://localhost:${PORT}/graphql`,
  }),
  cache: new InMemoryCache(),
});

export default client;
