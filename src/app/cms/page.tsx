// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import authOptions from "../api/auth/[...nextauth]";

// export default async function CmsPage() {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     redirect("/auth/signin");
//   }

//   return (
//     <div className="flex h-screen">
//       <div className="w-64 bg-gray-800 text-white">
//         {/* Sidebar */}
//         <h1 className="text-xl font-bold p-4">CMS Sidebar</h1>
//         <ul>
//           <li>Dashboard</li>
//           <li>Users</li>
//           <li>Settings</li>
//         </ul>
//       </div>
//       <div className="flex-1 bg-gray-100 p-4">
//         <h1 className="text-2xl font-bold">Bem-vindo ao CMS</h1>
//       </div>
//     </div>
//   );
// }
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "../api/auth/[...nextauth]";

export default async function CmsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white">
        <h1 className="text-xl font-bold p-4">CMS Sidebar</h1>
        <ul>
          <li>Dashboard</li>
          <li>Users</li>
          <li>Settings</li>
        </ul>
      </aside>
      <main className="flex-1 bg-gray-100 p-4">
        <h1 className="text-2xl font-bold">Bem-vindo ao CMS</h1>
      </main>
    </div>
  );
}
