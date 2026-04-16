import { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import ProjectCard from "../components/projects/ProjectCard";
import CreateProjectModal from "../components/projects/CreateProjectModal";
import API from "../services/api";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get("/projects");
        setProjects(res.data);
        setFiltered(res.data);
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Search filter
  useEffect(() => {
    const result = projects.filter((p) =>
      (p.name || "").toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, projects]);

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-semibold text-white">Projects</h1>
          <p className="text-gray-400 text-sm">
            Manage and track all your projects
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-gradient-to-r from-pink-500 to-indigo-500 px-5 py-2 rounded-xl text-white font-medium shadow-lg hover:opacity-90 transition"
        >
          + New Project
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative max-w-md">
        <FaSearch className="absolute top-3 left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-gray-400">Loading projects...</div>
      ) : filtered.length === 0 ? (

        /* Empty State */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center mt-20 text-center"
        >
          <h2 className="text-xl text-white mb-2">
            No projects found
          </h2>
          <p className="text-gray-400 mb-4">
            Create your first project to get started
          </p>

          <button
            onClick={() => setOpen(true)}
            className="bg-gradient-to-r from-pink-500 to-indigo-500 px-5 py-2 rounded-lg text-white"
          >
            Create Project
          </button>
        </motion.div>

      ) : (

        /* Project Grid */
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project) => (
            <motion.div
              key={project._id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Modal */}
      {open && (
        <CreateProjectModal
          setOpen={setOpen}
          setProjects={setProjects}
        />
      )}
    </Layout>
  );
}

export default Projects;