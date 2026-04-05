const router = require("express").Router();
const {
  addComment,
  getComments
} = require("../controllers/commentController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, addComment);
router.get("/:ticketId", protect, getComments);

module.exports = router;