const Comment = require("../models/Comment");

// ➕ ADD COMMENT
exports.addComment = async (req, res) => {
  try {
    const { text, ticketId } = req.body;

    const comment = await Comment.create({
      text,
      ticketId,
      user: req.user._id,
    });

    res.json(comment);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// 📥 GET COMMENTS
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      ticketId: req.params.ticketId,
    }).populate("user", "name");

    res.json(comments);
  } catch (err) {
    res.status(500).json(err.message);
  }
};