// import NextAuth, { type AuthOptions, type Session } from "next-auth"
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import { PrismaClient } from "@prisma/client"
// import CredentialsProvider from "next-auth/providers/credentials"
// import bcrypt from "bcrypt"

// const prisma = new PrismaClient()

// export const authOptions: AuthOptions = {
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
//           throw new Error("Email e senha são obrigatórios.")
//         }

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         })

//         if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
//           throw new Error("Credenciais inválidas.")
//         }

//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//         }
//       },
//     }),
//   ],
//   session: { strategy: "jwt" },
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.user = {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//         }
//       }
//       return token
//     },
//     async session({ session, token }): Promise<Session> {
//       session.user = token.user as {
//         id: string
//         name: string | null
//         email: string | null
//       }
//       return session
//     },
//   },
// }

// const handler = NextAuth(authOptions)
// export { handler as GET, handler as POST }

import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { name, username, email, password } = await req.json()

    if (!name || !username || !email || !password) {
      return NextResponse.json({ message: "Todos os campos são obrigatórios." }, { status: 400 })
    }

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    })

    if (existingUser) {
      return NextResponse.json({ message: "Email ou username já cadastrados." }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } })
  } catch (error) {
    console.error("Erro ao registrar usuário:", error)
    return NextResponse.json({ message: "Erro interno do servidor." }, { status: 500 })
  }
}

