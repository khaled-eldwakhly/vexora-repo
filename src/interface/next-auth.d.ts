import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    user: UserInfo;
    token: string;
  }

  interface UserInfo {
    name: string;
    email: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    idToken?: string;
    user: UserInfo;
  }
}
