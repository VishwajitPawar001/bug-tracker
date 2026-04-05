const Ticket = require("../models/Ticket");

// Create Ticket
exports.createTicket = async (req, res) => {
  try {
    const { title, description, priority, projectId, assignee } = req.body;

    const ticket = await Ticket.create({
      title,
      description,
      priority,
      projectId,
      assignee,
      createdBy: req.user._id
    });

    res.json(ticket);
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

// Update Ticket Status
exports.updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(ticket);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Delete Ticket
exports.deleteTicket = async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.json("Ticket deleted");
  } catch (error) {
    res.status(500).json(error.message);
  }
};