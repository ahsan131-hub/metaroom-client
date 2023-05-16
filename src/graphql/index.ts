import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri:
    process.env.GRAPHQL_API ||
    'http://ec2-3-88-175-192.compute-1.amazonaws.com',
  // link: authLink.concat(httpLink),
  // headers: {
  //   authorization: authToken(),
  // },
  cache: new InMemoryCache(),
});

export default client;
