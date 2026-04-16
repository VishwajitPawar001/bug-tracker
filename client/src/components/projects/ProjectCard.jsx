import { FaBug, FaTrash, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

function ProjectCard({ project }) {
  const navigate = useNavigate();

  const deleteProject = async (e) => {
    e.stopPropagation();
    if (!window.confirm("Delete this project?")) return;

    try {
      await API.delete(`/projects/${project._id}`);
      window.location.reload();
    } catch (err) {
      setError("Something went wrong");
      alert("Error deleting project");
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
      onClick={() => navigate(`/projects/${project._id}`)}
      className="group relative bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-lg cursor-pointer hover:shadow-pink-500/10 hover:border-pink-500/30 transition-all duration-300"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-r from-pink-500/10 to-indigo-500/10 blur-xl"></div>

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-white text-xl font-semibold group-hover:text-pink-400 transition">
          {project.name}
        </h2>

        <div className="flex gap-3 items-center">
          <FaBug className="text-pink-400" />

          <FaTrash
            className="text-red-400 hover:text-red-600 cursor-pointer opacity-70 hover:opacity-100 transition"
            onClick={deleteProject}
          />
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {project.description || "No description provided"}
      </p>

      {/* Stats Row */}
      <div className="flex justify-between items-center text-xs text-gray-500">
        
        {/* Team */}
        <div className="flex items-center gap-2">
          <FaUsers />
          <span>{project.teamMembers?.length || 1} teamMembers</span>
        </div>

        {/* Date */}
        <span>
          {new Date(project.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Footer hover action */}
      <div className="mt-4 text-right text-indigo-400 text-sm opacity-0 group-hover:opacity-100 transition">
        Open →
      </div>
    </motion.div>
  );
}

export default ProjectCard;