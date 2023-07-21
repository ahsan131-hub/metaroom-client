import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.GRAPHQL_API || 'https://34.227.150.193/',
  // link: authLink.concat(httpLink),
  // headers: {
  //   authorization: authToken(),
  // },
  cache: new InMemoryCache(),
});

export default client;
