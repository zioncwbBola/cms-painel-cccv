// import Link from "next/link"
// import { getServerSession } from "next-auth/next"
// import { authOptions } from "./api/auth/[...nextauth]"

// export default async function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const session = await getServerSession(authOptions)

//   return (
//     <html lang="pt-BR">
//       <body className="bg-gray-100">
//         <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
//           <h1 className="text-xl font-bold">Minha Aplicação</h1>
//           <nav className="flex gap-4">
//             {session ? (
//               <>
//                 <Link href="/cms" className="hover:underline">
//                   CMS
//                 </Link>
//                 <Link href="/api/auth/signout" className="hover:underline">
//                   Sair
//                 </Link>
//               </>
//             ) : (
//               <>
//                 <Link href="/auth/signin" className="hover:underline">
//                   Login
//                 </Link>
//                 <Link href="/auth/signup" className="hover:underline">
//                   Registrar
//                 </Link>
//               </>
//             )}
//           </nav>
//         </header>
//         <main className="p-4">{children}</main>
//       </body>
//     </html>
//   )
// }

//import { headers } from "next/headers"
//import { redirect } from "next/navigation"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/auth.config";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="pt-BR">
      <head>
      <meta name="google-site-verification" content="f7z7Q-Fme5-I-gy1j0k16sszIaSx8CTDcsxgVWRqKxs" />
      </head>
      <body className="min-h-screen bg-gray-100">
        <header className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">
              Minha Aplicação
            </Link>
            <nav className="space-x-4">
              {session ? (
                <>
                  <Link href="/cms" className="hover:text-gray-300">
                    CMS
                  </Link>
                  <Link href="/api/auth/signout" className="hover:text-gray-300">
                    Sair
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/auth/signin" className="hover:text-gray-300">
                    Login
                  </Link>
                  <Link href="/auth/signup" className="hover:text-gray-300">
                    Registrar
                  </Link>
                </>
              )}
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}

