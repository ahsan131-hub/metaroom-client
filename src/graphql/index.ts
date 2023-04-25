import { ApolloClient, InMemoryCache } from '@apollo/client';

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   // const token = localStorage.getItem('token');
//   const { data: session } = useSession();
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: session?.accessToken as string,
//     },
//   };
// });
// const httpLink = createHttpLink({
//   uri: 'http://localhost:4000',
// });

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  // link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
