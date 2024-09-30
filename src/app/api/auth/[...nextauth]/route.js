import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import users from "../../../../models/users";
import { connectToDB } from "../../../../utils/database";

const handler = NextAuth({
  providers: [
    credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDB();

        const user = await users
          .findOne({
            email: credentials?.email,
          })
          .select("+password");
        if (!user) {
          return new Response(JSON.stringify({ message: "Incorrect Email" }), {
            status: 401,
          });
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          return new Response(JSON.stringify({ message: "Wrong Password" }), {
            status: 401,
          });
        }
        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await users.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();
      session.user.role = sessionUser.role;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
