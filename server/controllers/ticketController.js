const Ticket = require("../models/Ticket");

// Create Ticket
exports.createTicket = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      projectId,
      assignee,
      attachments // 🔥 FIX: include this
    } = req.body;

    // 🔥 GET LAST ORDER
    const lastTicket = await Ticket.find({ projectId })
      .sort({ order: -1 })
      .limit(1);

    const newOrder =
      lastTicket.length > 0 ? lastTicket[0].order + 1 : 0;

    // ✅ CREATE TICKET
    const ticket = await Ticket.create({
      title,
      description,
      priority: priority || "medium",
      projectId,
      assignee: assignee || null,

      // 🔥 SAFE FIX
      attachments: attachments || [],

      order: newOrder,
      createdBy: req.user._id
    });

    res.status(201).json(ticket);
  } catch (error) {
    console.error("CREATE TICKET ERROR:", error); // 🔥 ADD THIS
    res.status(500).json(error.message);
  }
};
exports.reorderTickets = async (req, res) => {
  try {
    const updates = req.body.tickets;

    for (const item of updates) {
      await Ticket.findByIdAndUpdate(item.id, {
        order: item.order,
      });
    }

    res.json("Reordered successfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Get Tickets by Project
exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({
      projectId: req.params.projectId
    })
      .populate("assignee", "name email")
      .populate("createdBy", "name email");

    res.json(tickets);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// UPDATE TICKET STATUS
exports.updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: "after" }
    );

    res.json(ticket);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const { title, description, priority, assignee, attachments } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { title, description, priority, assignee, attachments },
      { new: true }
    );

    res.json(ticket);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// Delete Ticket
exports.deleteTicket = async (req, res) => {
  try {
    console.log("🧪 DELETE REQUEST:", req.params.id); // ✅ ADD

    const deleted = await Ticket.findByIdAndDelete(req.params.id);

    console.log("🧪 DELETED FROM DB:", deleted); // ✅ ADD

    res.json("Ticket deleted");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ createdBy: req.user._id });
    res.json(tickets);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
