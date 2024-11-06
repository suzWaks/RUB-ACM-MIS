import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import users from "../../../../models/users";
import { connectToDB } from "../../../../utils/database";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "authentication/login",
  },

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
          console.log("Incorrect Email");
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password.trim(),
          user.password
        );
        if (!passwordMatch) {
          console.log("Wrong Password");
          return null;
        }
        const userObject = {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
          // Add any other properties from the user object you want in the session
        };
        console.log("User Object: ", JSON.stringify(userObject));
        return userObject;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Store user data in the token when they log in
      if (user) {
        token.id = user.id; // Store user id in token
        token.email = user.email; // Store user email in token
        token.role = user.role; // Store user role in token
        // Add any other properties from the user object you want in the token
      }
      return token;
    },

    async session({ session, token }) {
      // Populate session object with user data from token
      if (token) {
        session.user.id = token.id; // Assign user id to session
        session.user.email = token.email; // Assign user email to session
        session.user.role = token.role; // Assign user role to session
        // Assign any other properties from the token you want in the session
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
