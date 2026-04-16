import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import API from "../services/api";

import { FaBug, FaCheckCircle, FaProjectDiagram } from "react-icons/fa";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tickets, setTickets] = useState([]);

  const navigate = useNavigate(); // ✅ navigation

  const fetchData = async () => {
    try {
      const projectRes = await API.get("/projects");
      const ticketRes = await API.get("/tickets/all");

      setProjects(projectRes.data);
      setTickets(ticketRes.data);
    } catch (err) {
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ STATS
  const totalProjects = projects.length;
  const totalTickets = tickets.length;
  const completed = tickets.filter(t => t.status === "done").length;

  return (
    <Layout>
      <h1 className="text-white text-3xl mb-6">Dashboard</h1>

      {/* 🔥 STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">

        {/* Projects */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-400">Total Projects</p>
            <FaProjectDiagram className="text-indigo-400" />
          </div>
          <h2 className="text-white text-3xl">{totalProjects}</h2>
        </div>

        {/* Tickets */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-400">Total Tickets</p>
            <FaBug className="text-pink-400" />
          </div>
          <h2 className="text-white text-3xl">{totalTickets}</h2>
        </div>

        {/* Completed */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-400">Completed</p>
            <FaCheckCircle className="text-green-400" />
          </div>
          <h2 className="text-green-400 text-3xl">{completed}</h2>
        </div>

      </div>

      {/* 🔥 RECENT ACTIVITY */}
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <h2 className="text-white mb-3">Recent Activity</h2>

        {tickets.length === 0 ? (
          <p className="text-gray-400 text-sm">No recent activity</p>
        ) : (
          <div className="space-y-2">

            {tickets.slice(0, 5).map(t => (
              <div
                key={t._id}
                onClick={() => navigate(`/projects/${t.projectId}`)} // ✅ redirect
                className="flex justify-between items-center text-gray-300 text-sm p-2 rounded cursor-pointer hover:bg-white/5 hover:text-white transition"
              >
                <span>• {t.title}</span>

                <span className="text-xs text-gray-500">
                  {t.status}
                </span>
              </div>
            ))}

          </div>
        )}
      </div>
    </Layout>
  );
}

export default Dashboard;