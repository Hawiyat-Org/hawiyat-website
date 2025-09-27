// lib/auth.ts
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from './prisma/prismaClient'
import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth"



// Custom Bitbucket Provider (since it's not officially supported)
interface BitbucketProfile {
  uuid: string
  username: string
  display_name: string
  account_id: string
  nickname: string
  avatar: string
  website?: string
  location?: string
  created_on: string
  type: string
  has_2fa_enabled: boolean
  links: {
    avatar: { href: string }
    html: { href: string }
    self: { href: string }
  }
  email?: string
}

function BitbucketProvider(options: OAuthUserConfig<BitbucketProfile>): OAuthConfig<BitbucketProfile> {
  return {
    id: "bitbucket",
    name: "Bitbucket",
    type: "oauth",
    authorization: {
      url: "https://bitbucket.org/site/oauth2/authorize",
      params: {
        scope: "account email",
        response_type: "code",
      },
    },
    token: "https://bitbucket.org/site/oauth2/access_token",
    userinfo: {
      url: "https://api.bitbucket.org/2.0/user",
      async request(context: { tokens: { access_token?: string } }) {
        const { tokens } = context;
        
        if (!tokens.access_token) {
          throw new Error("No access token available");
        }

        const [userRes, emailRes] = await Promise.all([
          fetch("https://api.bitbucket.org/2.0/user", {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
          }),
          fetch("https://api.bitbucket.org/2.0/user/emails", {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
          }).catch(() => null)
        ]);
        
        const user = await userRes.json();
        const emails = emailRes ? await emailRes.json() : null;
        const primaryEmail = emails?.values?.find((e: { is_primary: boolean; email: string }) => e.is_primary)?.email;
        
        return { ...user, email: primaryEmail };
      },
    },
    profile(profile: BitbucketProfile) {
      return {
        id: profile.account_id,
        name: profile.display_name || profile.username,
        email: profile.email || null,
        image: profile.links?.avatar?.href || profile.avatar,
      }
    },
    options,
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const normalizedEmail = credentials.email.toLowerCase();
          
          // Get user from database (including the hashed password)
          const user = await prisma.user.findUnique({
            where: { email: normalizedEmail },
            select: {
              id: true,
              email: true,
              name: true,
              image: true,
              password: true // Include the hashed password for comparison
            }
          });
          
          if (!user || !user.password) {
            throw new Error("Invalid email or password");
          }

          // Verify password against the hashed password from database
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValidPassword) {
            throw new Error("Invalid email or password");
          }

          // Return user data without password
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image
          };

        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error("Authentication failed");
        } finally {
          await prisma.$disconnect();
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    BitbucketProvider({
      clientId: process.env.BITBUCKET_CLIENT_ID!,
      clientSecret: process.env.BITBUCKET_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user?.email && token?.sub) {
        try {
          // Get fresh user data from database
          const dbUser = await prisma.user.findUnique({
            where: { email: session.user.email.toLowerCase() },
            select: {
              id: true,
              email: true,
              name: true,
              image: true
            }
          });

          if (dbUser) {
            session.user = {
              ...session.user,
              id: dbUser.id,
              name: dbUser.name,
              image: dbUser.image,
              email: dbUser.email
            };
          }
        } catch (error) {
          console.error("Session callback error:", error);
        } finally {
          await prisma.$disconnect();
        }
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.sub = user.id
      }
      return token
    },
    signIn: async ({ user, account, profile }) => {
      try {
        // Handle OAuth providers (Google, GitHub, Bitbucket)
        if (account?.provider !== "credentials") {
          const normalizedEmail = user.email?.toLowerCase();
          
          if (!normalizedEmail) {
            console.error("No email provided by OAuth provider");
            return false;
          }

          // Check if user already exists
          const existingUser = await prisma.user.findUnique({
            where: { email: normalizedEmail }
          });

          if (!existingUser) {
            // Create new user for OAuth sign-in
            await prisma.user.create({
              data: {
                email: normalizedEmail,
                name: user.name || profile?.name || user.email,
                image: user.image || profile?.image,
                // Don't set password for OAuth users
              }
            });
          } else {
            // Update existing user's info if needed
            await prisma.user.update({
              where: { email: normalizedEmail },
              data: {
                name: user.name || existingUser.name,
                image: user.image || existingUser.image,
              }
            });
          }
        }
        
        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        return false;
      } finally {
        await prisma.$disconnect();
      }
    },
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
}