const router = require("express").Router();
const {
  createProject,
  getProjects,
  deleteProject
} = require("../controllers/projectController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createProject);
router.get("/", protect, getProjects);
router.delete("/:id", protect, deleteProject);

module.exports = router;