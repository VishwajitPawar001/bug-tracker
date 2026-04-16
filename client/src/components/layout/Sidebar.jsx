import { NavLink } from "react-router-dom";
import { FaBug, FaProjectDiagram, FaUser, FaSignOutAlt } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="w-64 bg-[#0f172a] text-gray-300 min-h-screen p-6 hidden md:flex flex-col border-r border-white/10">

      {/* Logo */}
      <h1 className="text-2xl font-bold text-white mb-10">Bug Tracker</h1>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive
                ? "bg-gradient-to-r from-pink-500/20 to-indigo-500/20 text-white"
                : "hover:bg-white/10 hover:text-white"
            }`
          }
        >
          <FaBug /> Dashboard
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive
                ? "bg-gradient-to-r from-pink-500/20 to-indigo-500/20 text-white"
                : "hover:bg-white/10 hover:text-white"
            }`
          }
        >
          <FaProjectDiagram /> Projects
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive
                ? "bg-gradient-to-r from-pink-500/20 to-indigo-500/20 text-white"
                : "hover:bg-white/10 hover:text-white"
            }`
          }
        >
          <FaUser /> Profile
        </NavLink>

      </nav>

      {/* Logout */}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
        className="flex items-center gap-3 text-red-400 hover:bg-red-500/10 p-3 rounded-lg transition"
      >
        <FaSignOutAlt /> Logout
      </button>

    </div>
  );
}

export default Sidebar;