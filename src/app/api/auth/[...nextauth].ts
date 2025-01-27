// /* eslint-disable @typescript-eslint/no-explicit-any */
// import NextAuth from "next-auth";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";
// import type { SessionStrategy } from "next-auth";
// import type { Session } from "next-auth";

// const prisma = new PrismaClient();

// export const authOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials.password) {
//           throw new Error("Email and password required");
//         }

//         // Encontre o usuário no banco de dados
//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
//           throw new Error("Invalid email or password");
//         }

//         // Certifique-se de que o id seja uma string
//         return {
//           id: String(user.id), // Converter para string se necessário
//           email: user.email,
//           name: user.name,
//         };
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt" as SessionStrategy, // Adicionamos o tipo explicitamente
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     async session({ session, token }: { session: Session; token: any }) {
//       if (token) {
//         session.user = token.user as any;
//       }
//       return session;
//     },
//     async jwt({ token, user }: { token: any; user?: any }) {
//       if (user) {
//         token.user = user;
//       }
//       return token;
//     },
//   },
//   debug: true, // Para ajudar no debug
// };

// export default NextAuth(authOptions);
// import NextAuth, { AuthOptions } from "next-auth";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";

// const prisma = new PrismaClient();



// export const authOptions: AuthOptions = {
//   debug: true,
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials.password) {
//           throw new Error("Email e senha são obrigatórios.");
//         }

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
//           throw new Error("Credenciais inválidas.");
//         }

//         return {
//           id: String(user.id), // Certificar que o ID é uma string
//           email: user.email,
//           name: user.name,
//         };
//       },
//     }),
//   ],
//   session: { strategy: "jwt" },
//   secret: process.env.NEXTAUTH_SECRET, 
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.user = user;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user = token.user as { name?: string | null; email?: string | null; image?: string | null };
//       return session;
//     },
//   },
//   //debug: process.env.NODE_ENV === "development", // Debug apenas no ambiente dev
// };

// export default NextAuth(authOptions);
import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  debug: true, // Debug para identificar problemas
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Credenciais recebidas:", credentials);

        if (!credentials?.email || !credentials.password) {
          throw new Error("Email e senha são obrigatórios.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        console.log("Usuário encontrado:", user);

        if (!user) {
          console.error("Usuário não encontrado.");
          throw new Error("Credenciais inválidas.");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        console.log("Senha válida:", isPasswordValid);

        if (!isPasswordValid) {
          console.error("Senha inválida.");
          throw new Error("Credenciais inválidas.");
        }

        return {
          id: String(user.id),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as {
        id: string;
        name: string | null;
        email: string | null;
      };
      return session;
    },
  },
};
export default NextAuth(authOptions);
