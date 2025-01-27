import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100">
        <header className="bg-gray-800 text-white p-4 flex justify-between">
          <h1 className="text-xl font-bold">Minha Aplicação</h1>
          <nav className="flex gap-4">
            <Link href="/auth/signin" className="hover:underline">
              Login
            </Link>
            <Link href="/auth/signup" className="hover:underline">
              Registrar
            </Link>
          </nav>
        </header>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
