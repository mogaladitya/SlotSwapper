import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="flex flex-col h-screen w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border-r border-white/10 backdrop-blur-xl text-gray-300">
      <div className="p-6 flex items-center space-x-3 border-b border-white/10">
        <span className="text-2xl font-semibold text-white tracking-tight">SlotSwapper</span>
      </div>

      <div className="flex-1 px-4 py-6 space-y-2">
        <Link
          to="/dashboard"
          className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
            isActive("/dashboard")
              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
              : "hover:bg-white/10 hover:text-white"
          }`}
        >
          <i className="ri-dashboard-line mr-3 text-lg"></i> Dashboard
        </Link>

        <Link
          to="/marketplace"
          className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
            isActive("/marketplace")
              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
              : "hover:bg-white/10 hover:text-white"
          }`}
        >
          <i className="ri-store-line mr-3 text-lg"></i> Marketplace
        </Link>

        <Link
          to="/requests"
          className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
            isActive("/requests")
              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
              : "hover:bg-white/10 hover:text-white"
          }`}
        >
          <i className="ri-mail-line mr-3 text-lg"></i> Requests
        </Link>
      </div>

      <div className="p-6 border-t border-white/10">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white rounded-xl transition-all duration-300"
        >
          <i className="ri-logout-box-line mr-3 text-lg"></i> Logout
        </button>
      </div>
    </nav>
  );
}
