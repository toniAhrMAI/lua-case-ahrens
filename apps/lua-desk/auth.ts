// apps/lua-desk/auth.ts
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import NextAuth from 'next-auth';
import { encode as defaultEncode } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';
import { v4 as uuid } from 'uuid';
import { db } from './db';
import { users } from './src/db';
import { DRIZZLE_ADAPTER } from './src/db/adapter';

const adapter = DRIZZLE_ADAPTER;

export const authOptions = {
  adapter,
  jwt: {
    encode: async function (params: any) {
      if (params.token?.credentials) {
        const sessionToken = uuid();
        if (!params.token.sub) throw new Error('No user ID found in token');

        await adapter?.createSession?.({
          sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        return sessionToken;
      }
      return defaultEncode(params);
    },
  },
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (account?.provider === 'credentials') token.credentials = true;
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET ?? 'super-secret-key',
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (
          !credentials ||
          typeof credentials.username !== 'string' ||
          typeof credentials.password !== 'string'
        ) {
          throw new Error('Invalid credentials');
        }

        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.username),
        });

        if (!user) {
          throw new Error('User not found.');
        }
        if (!user.password_hash) {
          throw new Error('User has no password set.');
        }
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password_hash
        );
        if (!isValid) {
          throw new Error('Invalid password.');
        }

        return user;
      },
    }),
  ],
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
