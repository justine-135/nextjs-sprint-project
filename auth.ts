import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Login, VerifyPassword } from "./app/lib/actions/queries";
import { ILoginParams } from "./app/lib/definitions/users";
import { authConfig } from "./auth.config";
import { z } from "zod";

// const formSchema = z.object({
//   email: z.string().email({
//     message: "Invalid email address",
//   }),
//   password: z.string().min(2, {
//     message: "Password must be at least 2 characters",
//   }),
// });

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await Login(email);
          if (!user) return null;
          const passwordsMatch = await VerifyPassword(password, user.password);

          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");

        return null;
      },
    }),
  ],
});
