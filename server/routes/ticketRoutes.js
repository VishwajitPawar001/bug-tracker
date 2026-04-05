const router = require("express").Router();
const {
  createTicket,
  getTickets,
  updateTicketStatus,
  deleteTicket
} = require("../controllers/ticketController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Create Ticket
router.post("/", protect, createTicket);

// Upload Attachment
router.post("/upload", protect, upload.single("file"), (req, res) => {
  res.json({ filePath: req.file.path });
});

router.get("/:projectId", protect, getTickets);
router.put("/:id/status", protect, updateTicketStatus);
router.delete("/:id", protect, deleteTicket);

module.exports = router;