interface User {
  id: string; // Google User ID
  name: string; // User's name
  email: string; // User's email
  image: string; // User's avatar image URL
}

interface Session {
  user: Session | null;
  // The user object
  expires: string; // Session expiration date in ISO format
}

export type { User, Session };
