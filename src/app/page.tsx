import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { redirect } from "next/navigation";

export default async function Home() {
  // Adicionar anotação de tipo para session
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/cms");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">Bem-vindo à Aplicação</h1>
      <p className="text-lg mb-6">
        Faça login ou registre-se para acessar o painel.
      </p>
    </div>
  );
}
