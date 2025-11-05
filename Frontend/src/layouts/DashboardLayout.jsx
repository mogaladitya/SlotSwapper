import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Floating Navbar */}
      

      {/* Sidebar */}
      <Sidebar />

      {/* Page content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
