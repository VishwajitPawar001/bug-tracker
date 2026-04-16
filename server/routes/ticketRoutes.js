const router = require("express").Router();
const {
  createTicket,
  getTickets,
  updateTicketStatus,
  updateTicket, 
  deleteTicket,
  reorderTickets,
  getAllTickets
} = require("../controllers/ticketController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Create Ticket
router.post("/", protect, createTicket);

// Upload Attachment
router.post("/upload", protect, upload.single("file"), (req, res) => {
  res.json({ filePath: req.file.path });
});

router.get("/all", protect, getAllTickets);

// Reorder
router.put("/reorder", protect, reorderTickets);

// Get tickets by project
router.get("/:projectId", protect, getTickets);

// Update status (drag/click)
router.put("/:id/status", protect, updateTicketStatus);

// Edit ticket (modal)
router.put("/:id", protect, updateTicket); 

// Delete
router.delete("/:id", protect, deleteTicket);

module.exports = router;