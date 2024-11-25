import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb"; // MongoDB connection utility

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise), // Use the MongoDB adapter
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER!, // SMTP server
      from: process.env.EMAIL_FROM!, // Email sender address
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const adapter = MongoDBAdapter(clientPromise);

      try {
        // Check if there is an existing user with the same email
        const existingUser =
          adapter.getUserByEmail && user.email
            ? await adapter.getUserByEmail(user.email)
            : null;

        if (existingUser) {
          // If user exists, link the new account to the existing user
          await adapter.linkAccount({
            ...account,
            userId: existingUser.id, // Link the account to the existing user ID
          });
        }
      } catch (error) {
        console.error("Error linking account:", error);
        return false; // Deny access if account linking fails
      }

      return true; // Allow sign-in
    },

    async session({ session, user }) {
      // Map MongoDB `_id` to `session.user.id`
      //@ts-expect-error MongoDB uses `_id` instead of `id`
      session.user.id = user.id || user._id;
      return session;
    },
  },
});
