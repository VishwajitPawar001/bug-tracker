function Navbar() {
  return (
    <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex justify-between items-center">
      <h2 className="text-lg text-white font-semibold">Dashboard</h2>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-700 text-white px-3 py-1 rounded-lg focus:outline-none"
        />

        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
          U
        </div>
      </div>
    </div>
  );
}

export default Navbar;