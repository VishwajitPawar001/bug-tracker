const Comment = require("../models/Comment");

// Add Comment
exports.addComment = async (req, res) => {
  try {
    const { ticketId, text } = req.body;

    const comment = await Comment.create({
      ticketId,
      text,
      userId: req.user._id
    });

    res.json(comment);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Get Comments by Ticket
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      ticketId: req.params.ticketId
    }).populate("userId", "name email");

    res.json(comments);
  } catch (error) {
    res.status(500).json(error.message);
  }
};