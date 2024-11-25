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
    async session({ session, user }) {
      //@ts-expect-error MongoDB uses `_id` instead of `id`
      session.user.id = user.id || user._id; // MongoDB uses `_id`
      return session;
    },
  },
});
