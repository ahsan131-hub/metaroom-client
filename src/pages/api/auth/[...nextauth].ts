import jwt from 'jsonwebtoken';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import createUserByFetchAPICall from '@/utils/callGraphqlApi';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async jwt({ token, account }: any) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        // eslint-disable-next-line no-param-reassign
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: any) {
      // Send properties to the client, like an access_token from a provider.
      // eslint-disable-next-line no-param-reassign
      // eslint-disable-next-line no-param-reassign
      session.infraToken = jwt.sign(
        { data: { _id: token.id, name: token.name, email: token.email } },
        process.env.NEXTAUTH_SECRET || ''
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
};

export default NextAuth(authOptions);
