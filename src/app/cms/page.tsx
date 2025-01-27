import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/auth.config"
import Link from "next/link"

export default async function CmsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white">
        <h1 className="text-xl font-bold p-4">CMS Sidebar</h1>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link href="/cms" className="block px-4 py-2 hover:bg-gray-700">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/cms/users" className="block px-4 py-2 hover:bg-gray-700">
                Users
              </Link>
            </li>
            <li>
              <Link href="/cms/settings" className="block px-4 py-2 hover:bg-gray-700">
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to the CMS</h1>
        <p>Hello, {session.user?.name}! This is your dashboard.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
            <p>No recent activity to display.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Quick Stats</h2>
            <p>Total Users: 0</p>
            <p>Total Posts: 0</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Notifications</h2>
            <p>No new notifications.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

