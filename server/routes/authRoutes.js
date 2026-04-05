const router = require("express").Router();
const { register, login } = require("../controllers/authcontroller");
const protect = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);

router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;