import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getMockUserByCredentials } from "@/app/api/_mock-data";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      phone: string;
      address: string;
      avatarUrl: string;
    } & DefaultSession["user"];
  }

  interface User {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    avatarUrl: string;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
    avatarUrl?: string;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        const email =
          typeof credentials.email === "string"
            ? credentials.email.trim().toLowerCase()
            : "";
        const password =
          typeof credentials.password === "string"
            ? credentials.password
            : "";

        const user = getMockUserByCredentials(email, password);

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          image: user.avatarUrl,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          address: user.address,
          avatarUrl: user.avatarUrl,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.phone = user.phone;
        token.address = user.address;
        token.avatarUrl = user.avatarUrl;
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id ?? "";
      session.user.firstName = token.firstName ?? "";
      session.user.lastName = token.lastName ?? "";
      session.user.phone = token.phone ?? "";
      session.user.address = token.address ?? "";
      session.user.avatarUrl = token.avatarUrl ?? session.user.image ?? "";

      return session;
    },
  },
  secret: process.env.AUTH_SECRET ?? "eagle-bank-mock-auth-secret",
  session: {
    strategy: "jwt",
  },
  trustHost: true,
});
