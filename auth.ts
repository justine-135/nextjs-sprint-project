import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Login, VerifyPassword } from "./app/lib/actions/queries";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await Login(email as string);
        if (!user) return null;
        const passwordsMatch = await VerifyPassword(
          password as string,
          user.password
        );

        if (passwordsMatch) return user;

        return null;
      },
    }),
  ],
});
