import jwt from 'jsonwebtoken';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import process from 'process';

import createUserByFetchAPICall from '@/utils/callGraphqlApi';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: (process.env.GOOGLE_CLIENT_ID as string) || '',
      clientSecret: (process.env.GOOGLE_CLIENT_SECRET as string) || '',
      allowDangerousEmailAccountLinking: true,
      checks: 'none', // <-- THIS LINE
    }),
  ],
  secret:
    process.env.NEXTAUTH_SECRET ||
    'OSrZC9Vrgoaknp4D0fLMU8ao8mZCz4Xw57GPzFz8Tk4=',
  callbacks: {
    async jwt({ token, account }: any) {
      // Persist the OAuth access_token to the token right after signin
      console.log('acount information', account);
      if (account) {
        // eslint-disable-next-line no-param-reassign
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: any) {
      console.log('session', token);

      // Send properties to the client, like an access_token from a provider.
      // eslint-disable-next-line no-param-reassign
      // eslint-disable-next-line no-param-reassign
      session.infraToken = jwt.sign(
        { data: { _id: token.id, name: token.name, email: token.email } },
        process.env.NEXTAUTH_SECRET ||
          'B9uFz8XL4HyGN3KySJM3JDY/3mh98bGLlQvSw5Jt'
      );
      // create user here.
      await createUserByFetchAPICall(
        session.user.email,
        session.user.name,
        session.infraToken,
        session.user.image
      );
      // eslint-disable-next-line no-param-reassign
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: '/dashboard',
    signOut: '/',
    error: '/error', // Error code passed in query string as ?error=
  },
};

export default NextAuth(authOptions);
