import { signinUser } from "@/actions/auth.services";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        if (!credentials) return null;
        const data = await signinUser(credentials);
        if (data.message === "success") {
          const decodedToken: decodedTokenType = jwtDecode(data.token);
          return {
            id: decodedToken.id,
            user: data.user,
            token: data.token,
          };
        } else {
          throw new Error(data.message || "Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }
      return token;
    },
    session({ session, token }) {
      if (session) {
        session.user = token.user;
      }
      return session;
    },
  },
};
