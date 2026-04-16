import { useState, useEffect } from "react";
import API from "../../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

function CreateTicketModal({ setOpen, projectId, refreshTickets }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  const [members, setMembers] = useState([]);
  const [assignee, setAssignee] = useState("");

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // FETCH MEMBERS
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await API.get(`/projects/${projectId}/members`);
        setMembers(res.data);

        // 🔥 safer default
        if (res.data.length > 0) {
          setAssignee(res.data[0]._id);
        }
      } catch (err) {
        setError("Something went wrong");
      }
    };

    fetchMembers();
  }, [projectId]);

  const createTicket = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let attachments = [];

      // 🔥 UPLOAD FILE FIRST
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await API.post("/tickets/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // 🔥 SAFETY CHECK
        if (uploadRes.data?.filePath) {
          attachments.push(uploadRes.data.filePath);
        }
      }

      // 🔥 DEBUG (optional)
      console.log("Creating ticket with:", {
        title,
        description,
        projectId,
        priority,
        assignee,
        attachments,
      });

      // 🔥 CREATE TICKET
      await API.post("/tickets", {
        title,
        description,
        projectId,
        priority,
        assignee: assignee || null, // 🔥 prevent undefined
        attachments,
      });

      refreshTickets();
      setOpen(false);
    } catch (err) {
      console.log("CREATE ERROR:", err);
      setError("Failed to create ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          className="relative w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-6"
        >

          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-gray-300"
          >
            <FaTimes />
          </button>

          <h2 className="text-2xl text-white font-semibold mb-4">
            Create Ticket
          </h2>

          {error && (
            <div className="bg-red-500/20 text-red-300 p-2 rounded mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={createTicket} className="space-y-4">

            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 rounded bg-black/30 text-white"
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded bg-black/30 text-white"
            />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full p-3 rounded bg-black/30 text-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <select
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className="w-full p-3 rounded bg-black/30 text-white"
            >
              <option value="">Assign Member</option>
              {members.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.name} ({m.email})
                </option>
              ))}
            </select>

            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="text-white"
            />

            <button className="w-full bg-pink-500 py-2 rounded text-white">
              {loading ? "Creating..." : "Create Ticket"}
            </button>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default CreateTicketModal;