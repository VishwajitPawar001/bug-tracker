import { Link } from "react-router-dom";
import { FaBug, FaProjectDiagram, FaUser, FaSignOutAlt } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-gray-200 min-h-screen p-6 hidden md:block border-r border-gray-700">
      <h1 className="text-2xl font-bold mb-8 text-white">Bug Tracker</h1>

      <nav className="space-y-4">
        <Link to="/" className="flex items-center gap-3 hover:text-white hover:bg-gray-700 p-2 rounded-lg">
          <FaBug /> Dashboard
        </Link>

        <Link to="/projects" className="flex items-center gap-3 hover:text-white hover:bg-gray-700 p-2 rounded-lg">
          <FaProjectDiagram /> Projects
        </Link>

        <Link to="/profile" className="flex items-center gap-3 hover:text-white hover:bg-gray-700 p-2 rounded-lg">
          <FaUser /> Profile
        </Link>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="flex items-center gap-3 text-red-400 hover:bg-gray-700 p-2 rounded-lg w-full"
        >
          <FaSignOutAlt /> Logout
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;