import Link from "next/link"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./app/api/auth/auth.config"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="pt-BR">
      <body className="bg-gray-100">
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Minha Aplicação</h1>
          <nav className="flex gap-4">
            {session ? (
              <>
                <Link href="/cms" className="hover:underline">
                  CMS
                </Link>
                <Link href="/api/auth/signout" className="hover:underline">
                  Sair
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/signin" className="hover:underline">
                  Login
                </Link>
                <Link href="/auth/signup" className="hover:underline">
                  Registrar
                </Link>
              </>
            )}
          </nav>
        </header>
        <main className="p-4">{children}</main>
      </body>
    </html>
  )
}

