// // "use client";

// // import { signIn } from "next-auth/react";
// // import { useState } from "react";

// // export default function SignInPage() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   const handleSignIn = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     const result = await signIn("Credentials", {
// //       email,
// //       password,
// //       redirect: true,
// //       callbackUrl: "/",
// //     });

// //     if (!result?.ok) {
// //       alert("Credenciais inválidas");
// //     }
// //   };

// //   return (
// //     <div className="flex h-screen items-center justify-center">
// //       <form onSubmit={handleSignIn} className="bg-white p-6 rounded shadow">
// //         <h2 className="text-xl font-bold mb-4">Login</h2>
// //         <input
// //           type="email"
// //           placeholder="Email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           className="w-full mb-3 p-2 border rounded"
// //         />
// //         <input
// //           type="password"
// //           placeholder="Senha"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           className="w-full mb-3 p-2 border rounded"
// //         />
// //         <button type="submit" className="btn btn-primary w-full">
// //           Entrar
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }
// "use client";

// import { signIn } from "next-auth/react";
// import { useState } from "react";

// export default function SignInPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSignIn = async (e: React.FormEvent) => {
//     e.preventDefault();

//     console.log("Tentando login com:", { email, password });

//     const result = await signIn("Credentials", {
//       email,
//       password,
//       redirect: false, // Para evitar redirecionamento automático durante o debug
//     });

//     console.log("Resultado do signIn:", result);

//     if (!result?.ok) {
//       alert("Credenciais inválidas");
//     } else {
//       window.location.href = result.url || "/";
//     }
//   };

//   return (
//     <div className="flex h-screen items-center justify-center bg-gray-100">
//       <form onSubmit={handleSignIn} className="bg-white p-6 rounded shadow w-80">
//         <h2 className="text-xl font-bold mb-4">Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full mb-3 p-2 border rounded"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Senha"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full mb-3 p-2 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
//         >
//           Entrar
//         </button>
//       </form>
//     </div>
//   );
// }
"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Credenciais inválidas")
      } else {
        router.push("/cms")
        router.refresh()
      }
    } catch {
      setError("Ocorreu um erro ao tentar fazer login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Login</h2>
          <p className="mt-2 text-gray-600">Entre com suas credenciais</p>
        </div>

        {error && <div className="rounded-md bg-red-50 p-4 text-sm text-red-500">{error}</div>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  )
}

