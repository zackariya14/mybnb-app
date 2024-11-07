import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { prisma } from '@lib/prisma'; 
import { JWT } from 'next-auth/jwt'; 
import { Session } from 'next-auth'; 

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials: { email: string; password: string } | undefined) => {
        if (!credentials?.email || !credentials.password) {
          console.error('Missing email or password'); 
          return null;
        }

        try {

          const user = await prisma.user.findUnique({
            where: { email: credentials.email.toLowerCase() }, 
          });

          if (!user) {
            console.error('User not found');
            return null;
          }

         
          const isValidPassword = await compare(credentials.password, user.password);
          if (!isValidPassword) {
            console.error('Invalid password'); 
            return null;
          }

          console.log('User authenticated successfully:', user);
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin, 
          };
        } catch (error) {
          console.error('Error during authentication:', error); 
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt' as const, 
  },
  secret: process.env.NEXTAUTH_SECRET, 
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
     
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.isAdmin = user.isAdmin; 
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
     
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
          isAdmin: token.isAdmin as boolean,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login', 
    error: '/auth/error',  
  },
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
