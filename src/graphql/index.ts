import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.GRAPHQL_API || 'http://localhost:4000/',
  // link: authLink.concat(httpLink),
  // headers: {
  //   authorization: authToken(),
  // },
  cache: new InMemoryCache(),
});

export default client;
