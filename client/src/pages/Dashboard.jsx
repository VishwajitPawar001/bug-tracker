import Layout from "../components/layout/Layout";

function Dashboard() {
  return (
    <Layout>
      <h1 className="text-2xl text-white mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:bg-gray-700 transition">
          <h2 className="text-gray-400">Total Projects</h2>
          <p className="text-3xl text-white mt-2">5</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:bg-gray-700 transition">
          <h2 className="text-gray-400">Total Tickets</h2>
          <p className="text-3xl text-white mt-2">12</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:bg-gray-700 transition">
          <h2 className="text-gray-400">Completed</h2>
          <p className="text-3xl text-green-500 mt-2">7</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 mt-6">
        <h2 className="text-white text-lg mb-4">Recent Activity</h2>
        <p className="text-gray-400">No recent activity</p>
      </div>
    </Layout>
  );
}

export default Dashboard;