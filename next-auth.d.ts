// types/next-auth.d.ts
import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      id: string;
      role: string;
      name?: string | null;
      image?: string | null;
    };
  }
}
