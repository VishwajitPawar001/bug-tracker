const User = require("../models/User");

// ✅ GET PROFILE
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json("User not found");
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// ✅ UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  try {
    const { name, avatar } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json("User not found");
    }

    // 🔥 Update fields safely
    if (name) user.name = name;
    if (avatar !== undefined) user.avatar = avatar;

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
    });

  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("_id name email avatar");
    res.json(users);
  } catch (err) {
    res.status(500).json(err.message);
  }
};