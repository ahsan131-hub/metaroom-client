import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.GRAPHQL_API || 'https://metaroom.store/',
  // link: authLink.concat(httpLink),
  // headers: {
  //   authorization: authToken(),
  // },
  cache: new InMemoryCache(),
});

export default client;
