// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { signIn } from "next-auth/react"

// export default function SignupPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     username: "",
//     email: "",
//     password: "",
//   })
//   const [error, setError] = useState("")
//   const router = useRouter()

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")

//     try {
//       const response = await fetch("/api/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       })

//       if (response.ok) {
//         // Sign in the user after successful registration
//         const result = await signIn("credentials", {
//           redirect: false,
//           email: formData.email,
//           password: formData.password,
//         })

//         if (result?.error) {
//           setError("Failed to sign in after registration")
//         } else {
//           router.push("/cms")
//         }
//       } else {
//         const data = await response.json()
//         setError(data.message || "Signup failed")
//       }
//     } catch (error) {
//       setError("An unexpected error occurred")
//     }
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <form className="space-y-4 w-full max-w-md" onSubmit={handleSubmit}>
//         <h1 className="text-2xl font-bold text-center">Signup</h1>
//         {error && <p className="text-red-500 text-center">{error}</p>}
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           className="input input-bordered w-full"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           className="input input-bordered w-full"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="input input-bordered w-full"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           className="input input-bordered w-full"
//           onChange={handleChange}
//           required
//         />
//         <button type="submit" className="btn btn-primary w-full">
//           Sign Up
//         </button>
//       </form>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // Sign in the user after successful registration
        const result = await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        })

        if (result?.error) {
          setError("Failed to sign in after registration")
        } else {
          router.push("/cms")
        }
      } else {
        const data = await response.json()
        setError(data.message || "Signup failed")
      }
    } catch {
      setError("An unexpected error occurred")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="space-y-4 w-full max-w-md" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-center">Signup</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="input input-bordered w-full"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="input input-bordered w-full"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered w-full"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input input-bordered w-full"
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Sign Up
        </button>
      </form>
    </div>
  )
}

