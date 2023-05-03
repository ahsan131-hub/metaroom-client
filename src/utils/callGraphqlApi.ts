// import { HYGRAPH_PERMANENTAUTH_TOKEN, HYGRAPH_URL } from '../lib/constants';

// import email from 'next-auth/providers/email';

const createUserByFetchAPICall = async (
  email: any,
  name: any,
  token: any,
  image: string
) => {
  try {
    if (!email) {
      return;
    }
    // setIsLoading(true);
    const headers = {
      'content-type': 'application/json',
      Authorization: `${token}`,
      'x-api-key': process.env.API_SECRET as string,
    };
    const requestBody = {
      query: `mutation CreateUser($user: userInput) {
        createUser(user: $user) {
          status
          message
        }
      }`,
      variables: { user: { email, fName: name, image } },
    };
    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    };
    const response = await (
      await fetch(process.env.GRAPHQL_API as string, options)
    ).json();
    console.log('RESPONSE FROM FETCH REQUEST', response);
  } catch (err) {
    console.log('ERROR DURING FETCH REQUEST', err);
  }
};
export default createUserByFetchAPICall;
