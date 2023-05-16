import { ApolloClient, InMemoryCache } from '@apollo/client';

const token = '';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  // link: authLink.concat(httpLink),
  // headers: {
  //   authorization: authToken(),
  // },
  cache: new InMemoryCache(),
});

export default client;
