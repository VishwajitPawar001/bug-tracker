import { useState } from "react";
import API from "../../services/api";
import { motion } from "framer-motion";

function CreateProjectModal({ setOpen, setProjects }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const createProject = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/projects", {
        name,
        description,
      });

      setProjects((prev) => [...prev, res.data]);
      setOpen(false);
    } catch (err) {
      setError("Something went wrong");
      alert("Error creating project");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#0f172a] border border-white/10 p-8 rounded-2xl w-[400px]"
      >
        <h2 className="text-white text-xl mb-4">Create Project</h2>

        <form onSubmit={createProject} className="space-y-4">
          <input
            type="text"
            placeholder="Project Name"
            className="w-full p-3 rounded-lg bg-black/30 text-white border border-white/20"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            className="w-full p-3 rounded-lg bg-black/30 text-white border border-white/20"
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-gray-600 rounded-lg text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-lg text-white"
            >
              Create
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default CreateProjectModal;