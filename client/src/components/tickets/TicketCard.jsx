import { FaBug, FaCheckCircle, FaClock, FaPaperclip } from "react-icons/fa";
import API from "../../services/api";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useState } from "react";
import EditTicketModal from "./EditTicketModal";

function TicketCard({ ticket, refreshTickets, setTickets }) {

  const [openEdit, setOpenEdit] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: ticket._id,

    // 🔥 IMPORTANT FIX
    activationConstraint: {
      distance: 8,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : "auto",
  };

  // STATUS UPDATE
  const updateStatus = async () => {
    if (ticket.status === "done") return;

    let nextStatus;
    if (ticket.status === "todo") nextStatus = "inprogress";
    else if (ticket.status === "inprogress") nextStatus = "done";

    try {
      await API.put(`/tickets/${ticket._id}/status`, {
        status: nextStatus,
      });
      refreshTickets();
    } catch (err) {
      setError("Something went wrong");
    }
  };

  // STATUS STYLE
  const getStatus = () => {
    switch (ticket.status) {
      case "todo":
        return {
          label: "To Do",
          color: "bg-gray-500/20 text-gray-300",
          icon: <FaClock />,
        };
      case "inprogress":
        return {
          label: "In Progress",
          color: "bg-yellow-500/20 text-yellow-300",
          icon: <FaBug />,
        };
      case "done":
        return {
          label: "Done",
          color: "bg-green-500/20 text-green-300",
          icon: <FaCheckCircle />,
        };
      default:
        return {};
    }
  };

  // DELETE
  const deleteTicket = async (e) => {
    e.stopPropagation();

    const confirmDelete = window.confirm("Delete this ticket?");
    if (!confirmDelete) return;

    setDeleting(true);

    try {
      setTickets(prev => prev.filter(t => t._id !== ticket._id));
      await API.delete(`/tickets/${ticket._id}`);
    } catch (err) {
      setError("Something went wrong");
      refreshTickets();
    } finally {
      setDeleting(false);
    }
  };

  const getPriority = () => {
    switch (ticket.priority) {
      case "high":
        return "bg-red-500/20 text-red-400";
      case "medium":
        return "bg-yellow-500/20 text-yellow-300";
      case "low":
        return "bg-green-500/20 text-green-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  const status = getStatus();

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={`group border border-white/10 p-5 rounded-xl transition bg-white/5
          ${ticket.status !== "done"
            ? "hover:border-pink-500/30"
            : "opacity-60"
          }`}
      >

        {/* 🔥 HEADER */}
        <div className="flex justify-between items-center mb-2">

          {/* 🔥 DRAG HANDLE ONLY */}
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing flex items-center gap-2"
          >
            <FaBug className="text-pink-400" />
          </div>

          {/* 🔥 CLICK AREA (NOW WORKS PERFECTLY) */}
          <h2
            onClick={(e) => {
              e.stopPropagation();
              if (!isDragging) setOpenEdit(true);
            }}
            className="text-white flex-1 ml-2 cursor-pointer hover:text-pink-400"
          >
            {ticket.title}
          </h2>

          <button
            onClick={deleteTicket}
            disabled={deleting}
            className={`text-sm ${
              deleting
                ? "text-gray-500"
                : "text-red-400 hover:text-red-500"
            }`}
          >
            {deleting ? "..." : "✕"}
          </button>

        </div>

        {/* STATUS + PRIORITY */}
        <div className="flex gap-2 mb-2">
          <span className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${status.color}`}>
            {status.icon}
            {status.label}
          </span>

          <span className={`text-xs px-2 py-1 rounded ${getPriority()}`}>
            {ticket.priority || "medium"}
          </span>
        </div>

        {/* ASSIGNEE */}
        {ticket.assignee && (
          <div className="flex items-center gap-2 text-xs text-blue-400 mb-2">
            <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-white text-[10px]">
              {ticket.assignee.name.charAt(0).toUpperCase()}
            </div>
            {ticket.assignee.name}
          </div>
        )}

        {/* DESCRIPTION */}
        <p
          onClick={(e) => {
            e.stopPropagation();
            if (!isDragging) updateStatus();
          }}
          className="text-gray-400 text-sm cursor-pointer hover:text-white"
        >
          {ticket.description || "No description"}
        </p>

        {/* ATTACHMENTS */}
        {ticket.attachments?.length > 0 && (
          <div className="mt-2 space-y-1">
            {ticket.attachments.map((file, index) => (
              <a
                key={index}
                href={`http://localhost:5000/${file}`}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-xs text-blue-400 hover:underline"
              >
                <FaPaperclip />
                {file.split("/").pop()}
              </a>
            ))}
          </div>
        )}

        <div className="text-xs text-gray-500 mt-3 opacity-0 group-hover:opacity-100">
          {ticket.status === "done"
            ? "Completed ✓"
            : "Click to update • Drag to move"}
        </div>
      </div>

      {openEdit && (
        <EditTicketModal
          ticket={ticket}
          setOpen={setOpenEdit}
          refreshTickets={refreshTickets}
        />
      )}
    </>
  );
}

export default TicketCard;