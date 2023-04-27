import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

let token = '';
// const authToken = () => {
//   // get the authentication token from local storage if it exists
//   // const token = localStorage.getItem('token');

//   // return the headers to the context so httpLink can read them
//   if (token) return token;
//   // const { data: session } = useSession();
//   token = window.localStorage.getItem('next-auth.session-token') as string;
//   console.log(token);
//   return token;
// };
// const httpLink = createHttpLink({
//   uri: 'http://localhost:4000',
// });

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  // link: authLink.concat(httpLink),
  // headers: {
  //   authorization: authToken(),
  // },
  cache: new InMemoryCache(),
});

export default client;
