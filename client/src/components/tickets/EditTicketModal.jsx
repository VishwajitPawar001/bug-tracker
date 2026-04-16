import { useState, useEffect } from "react";
import API from "../../services/api";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import Comments from "../comments/Comments";

function EditTicketModal({ ticket, setOpen, refreshTickets }) {
  const [title, setTitle] = useState(ticket.title);
  const [description, setDescription] = useState(ticket.description);
  const [priority, setPriority] = useState(ticket.priority || "medium");

  const [members, setMembers] = useState([]);
  const [assignee, setAssignee] = useState(ticket.assignee?._id || "");

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await API.get(`/projects/${ticket.projectId}/members`);
        setMembers(res.data);
      } catch (err) {
        setError("Something went wrong");
      }
    };

    fetchMembers();
  }, [ticket.projectId]);

  const updateTicket = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let attachments = [...(ticket.attachments || [])];

      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await API.post("/tickets/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (uploadRes.data?.filePath) {
          attachments.push(uploadRes.data.filePath);
        }
      }

      await API.put(`/tickets/${ticket._id}`, {
        title,
        description,
        priority,
        assignee: assignee || null,
        attachments,
      });

      refreshTickets();
      setOpen(false);
    } catch (err) {
      console.log("UPDATE ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Background */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
      >

        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-gray-300"
        >
          <FaTimes />
        </button>

        <h2 className="text-white text-xl mb-4">Edit Ticket</h2>

        {/* FORM */}
        <form onSubmit={updateTicket} className="space-y-4">

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded bg-black/30 text-white"
          />

          <textarea
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
                {m.name}
              </option>
            ))}
          </select>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="text-white"
          />

          {/* 🔥 CLICKABLE ATTACHMENTS */}
          {ticket.attachments?.length > 0 && (
            <div className="text-xs text-gray-300 space-y-1">
              Existing:
              {ticket.attachments.map((file, i) => (
                <a
                  key={i}
                  href={`http://localhost:5000/${file}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-blue-400 hover:underline"
                >
                  📎 {file.split("/").pop()}
                </a>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-pink-500 py-2 rounded text-white"
          >
            {loading ? "Updating..." : "Update"}
          </button>

        </form>

        {/* 🔥 COMMENTS OUTSIDE FORM */}
        <Comments ticketId={ticket._id} />

      </motion.div>
    </div>
  );
}

export default EditTicketModal;