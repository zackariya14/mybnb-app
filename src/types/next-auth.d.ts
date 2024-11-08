import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    isAdmin?: boolean; 
  }

  interface Session {
    user: {
      id: string;
      email: string;
      isAdmin?: boolean; 
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    isAdmin?: boolean; 
  }
}
