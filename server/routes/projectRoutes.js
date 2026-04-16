const router = require("express").Router();
const {
  createProject,
  getProjects,
  getProjectById,
  deleteProject,
  addMember,
  getteamMembers,
  removeMember // 🔥 add if you have it
} = require("../controllers/projectController");

const protect = require("../middleware/authMiddleware");

// ✅ CREATE PROJECT
router.post("/", protect, createProject);

// ✅ GET ALL PROJECTS
router.get("/", protect, getProjects);

// ✅ ADD MEMBER (CLEAN API)
router.post("/:id/members", protect, addMember);

// ✅ GET teamMembers OF PROJECT
router.get("/:id/members", protect, getteamMembers);

// ✅ GET SINGLE PROJECT (IMPORTANT → KEEP LAST dynamic route)
router.get("/:id", protect, getProjectById);

// ✅ DELETE PROJECT
router.delete("/:id", protect, deleteProject);

module.exports = router; 