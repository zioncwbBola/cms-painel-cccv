// import bcrypt from "bcrypt";
// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function POST(req: Request) {
//   try {
//     const { name, username, email, password } = await req.json();

//     if (!name || !username || !email || !password) {
//       return new NextResponse("Missing required fields", { status: 400 });
//     }

//     // Verificar se o username ou email já existem
//     const existingUser = await prisma.user.findFirst({
//       where: {
//         OR: [
//           { email },
//           { username },
//         ],
//       },
//     });

//     if (existingUser) {
//       return new NextResponse("User with this email or username already exists", { status: 409 });
//     }

//     // Criptografar a senha
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Criar o novo usuário
//     const user = await prisma.user.create({
//       data: {
//         name,
//         username,
//         email,
//         password: hashedPassword,
//       },
//     });

//     return NextResponse.json({ user });
//   } catch (error) {
//     console.error(error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// }
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, username, email, password } = await req.json();

    if (!name || !username || !email || !password) {
      return new NextResponse("Todos os campos são obrigatórios.", { status: 400 });
    }

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (existingUser) {
      return new NextResponse("Email ou username já cadastrados.", { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return new NextResponse("Erro interno do servidor.", { status: 500 });
  }
}
