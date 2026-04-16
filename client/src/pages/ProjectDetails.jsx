import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import API from "../services/api";
import CreateTicketModal from "../components/tickets/CreateTicketModal";
import TicketCard from "../components/tickets/TicketCard";
import AddMemberModal from "../components/projects/AddMemberModal";

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  pointerWithin
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

// SORT
const sortByOrder = (list) => {
  return [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
};

// COLUMN
function Column({ title, status, tickets, refreshTickets, setTickets }) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={`p-4 rounded-xl min-h-[400px] border transition flex flex-col
      ${isOver ? "bg-indigo-500/20 border-indigo-400" : "bg-white/5 border-white/10"}`}
    >
      <h2 className="text-white mb-4">{title}</h2>

      <SortableContext items={tickets.map(t => t._id)} strategy={verticalListSortingStrategy}>
        <div className="flex-1 space-y-4">

          {tickets.length === 0 && (
            <div className="h-32 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center text-gray-400 text-sm">
              Drop here
            </div>
          )}

          {tickets.map(ticket => (
            <TicketCard
              key={ticket._id}
              ticket={ticket}
              refreshTickets={refreshTickets}
              setTickets={setTickets}
            />
          ))}

        </div>
      </SortableContext>
    </div>
  );
}

function ProjectDetails() {
  const { id } = useParams();

  const [tickets, setTickets] = useState([]);
  const [project, setProject] = useState(null);

  const [open, setOpen] = useState(false);
  const [openMembers, setOpenMembers] = useState(false);

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // 🔥 NEW FILTER
  const [assigneeFilter, setAssigneeFilter] = useState("all");

  // 🔥 SAFE USER
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const sensors = useSensors(useSensor(PointerSensor));

  const fetchProject = async () => {
    try {
      const res = await API.get(`/projects/${id}`);
      setProject(res.data);
    } catch (err) {
      setError("Something went wrong");
    }
  };

  const fetchTickets = async () => {
    try {
      const res = await API.get(`/tickets/${id}`);
      setTickets(res.data);
    } catch (err) {
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchTickets();
    fetchProject();
  }, [id]);

  // DRAG
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeTicket = tickets.find(t => t._id === activeId);
    const overTicket = tickets.find(t => t._id === overId);
    if (!activeTicket) return;

    let targetStatus = null;

    if (overTicket) targetStatus = overTicket.status;
    if (!targetStatus && ["todo", "inprogress", "done"].includes(overId)) {
      targetStatus = overId;
    }

    if (!targetStatus) return;

    if (overTicket && activeTicket.status === overTicket.status) {
      const columnTickets = tickets
        .filter(t => t.status === activeTicket.status)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

      const oldIndex = columnTickets.findIndex(t => t._id === activeId);
      const newIndex = columnTickets.findIndex(t => t._id === overId);

      const reordered = [...columnTickets];
      const [moved] = reordered.splice(oldIndex, 1);
      reordered.splice(newIndex, 0, moved);

      const updated = tickets.map(t => {
        const index = reordered.findIndex(r => r._id === t._id);
        if (index !== -1) return { ...t, order: index };
        return t;
      });

      setTickets(updated);

      await API.put("/tickets/reorder", {
        tickets: reordered.map((t, i) => ({
          id: t._id,
          order: i,
        })),
      });

      return;
    }

    const flow = { todo: "inprogress", inprogress: "done" };
    if (flow[activeTicket.status] !== targetStatus) return;

    const columnTickets = tickets
      .filter(t => t.status === targetStatus)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    const newOrder = columnTickets.length;

    const updated = tickets.map(t =>
      t._id === activeId
        ? { ...t, status: targetStatus, order: newOrder }
        : t
    );

    setTickets(updated);

    await API.put(`/tickets/${activeId}/status`, {
      status: targetStatus,
    });
  };

  // 🔥 FILTER (UPDATED)
  const filteredTickets = tickets.filter(t => {
    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      (t.description || "").toLowerCase().includes(search.toLowerCase());

    const matchPriority =
      priorityFilter === "all" || t.priority === priorityFilter;

    let matchAssignee = true;

    if (assigneeFilter === "me") {
      matchAssignee = t.assignee?._id === user?._id;
    } else if (assigneeFilter !== "all") {
      matchAssignee = t.assignee?._id === assigneeFilter;
    }

    return matchSearch && matchPriority && matchAssignee;
  });

  const stats = {
    total: tickets.length,
    todo: tickets.filter(t => t.status === "todo").length,
    inprogress: tickets.filter(t => t.status === "inprogress").length,
    done: tickets.filter(t => t.status === "done").length,
    high: tickets.filter(t => t.priority === "high").length,
  };

  const todo = sortByOrder(filteredTickets.filter(t => t.status === "todo"));
  const inprogress = sortByOrder(filteredTickets.filter(t => t.status === "inprogress"));
  const done = sortByOrder(filteredTickets.filter(t => t.status === "done"));

  return (
    <Layout>
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-white text-2xl">Project Board</h1>

        <div className="flex gap-2">
          <button
            onClick={() => setOpenMembers(true)}
            className="bg-indigo-500 px-4 py-2 rounded text-white"
          >
            + Add Member
          </button>

          <button
            onClick={() => setOpen(true)}
            className="bg-pink-500 px-4 py-2 rounded"
          >
            + Create Ticket
          </button>
        </div>
      </div>

      {/* MEMBERS */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {project?.members?.map((m) => (
          <div key={m._id} className="bg-white/10 px-3 py-1 rounded text-sm text-white">
            {m.name}
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div className="flex gap-4 mb-6 flex-wrap">

        <input
          type="text"
          placeholder="Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 rounded bg-white/10 text-white border border-white/20"
        />

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-3 py-2 rounded bg-white/10 text-white border border-white/20"
        >
          <option value="all">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        {/* 🔥 ASSIGNEE FILTER */}
        <select
          value={assigneeFilter}
          onChange={(e) => setAssigneeFilter(e.target.value)}
          className="px-3 py-2 rounded bg-white/10 text-white border border-white/20"
        >
          <option value="all">All Members</option>
          <option value="me">My Tickets</option>

          {project?.members?.map((m) => (
            <option key={m._id} value={m._id}>
              {m.name}
            </option>
          ))}
        </select>

      </div>

      {/* BOARD */}
      <DndContext sensors={sensors} collisionDetection={pointerWithin} onDragEnd={handleDragEnd}>
        <div className="grid md:grid-cols-3 gap-6">
          <Column title="To Do" status="todo" tickets={todo} refreshTickets={fetchTickets} setTickets={setTickets} />
          <Column title="In Progress" status="inprogress" tickets={inprogress} refreshTickets={fetchTickets} setTickets={setTickets} />
          <Column title="Done" status="done" tickets={done} refreshTickets={fetchTickets} setTickets={setTickets} />
        </div>
      </DndContext>

      {/* MODALS */}
      {open && (
        <CreateTicketModal
          setOpen={setOpen}
          projectId={id}
          refreshTickets={fetchTickets}
        />
      )}

      {openMembers && (
        <AddMemberModal
          projectId={id}
          setOpen={setOpenMembers}
          refreshProject={fetchProject}
        />
      )}
    </Layout>
  );
}

export default ProjectDetails;