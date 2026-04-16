const router = require("express").Router();
const {
  getProfile,
  updateProfile,
  getAllUsers
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");



// ✅ GET PROFILE
router.get("/me", protect, getProfile);

// ✅ UPDATE PROFILE
router.put("/profile", protect, updateProfile);

router.get("/", protect, getAllUsers);

module.exports = router;