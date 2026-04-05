const Project = require("../models/Project");

// Create Project
exports.createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    const project = await Project.create({
      title,
      description,
      createdBy: req.user._id,
      teamMembers: [req.user._id]
    });

    res.json(project);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Get My Projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      teamMembers: req.user._id
    }).populate("teamMembers", "name email");

    res.json(projects);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Delete Project
exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json("Project deleted");
  } catch (error) {
    res.status(500).json(error.message);
  }
};