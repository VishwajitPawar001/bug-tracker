import { FaSearch, FaBell, FaBars } from "react-icons/fa";

function Navbar({ setSidebarOpen }) {
  return (
    <div className="bg-[#0f172a]/80 backdrop-blur-lg border-b border-white/10 px-6 py-4 flex justify-between items-center">

      {/* Left */}
      <div className="flex items-center gap-4">
        <FaBars
          className="text-white text-xl cursor-pointer md:hidden"
          onClick={() => setSidebarOpen(true)}
        />
        <h2 className="text-lg text-white font-semibold">Dashboard</h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="relative hidden md:block">
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-white/5 border border-white/10 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Notification */}
        <FaBell className="text-gray-300 text-xl cursor-pointer hover:text-white" />

        {/* Profile Avatar */}
        <div className="w-9 h-9 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer">
          U
        </div>

      </div>
    </div>
  );
}

export default Navbar;