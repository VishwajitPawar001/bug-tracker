const Project = require("../models/Project");

// Create Project
exports.createProject = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json("User not authorized");
    }

    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json("Project name is required");
    }

    const project = await Project.create({
      name: name,
      description: description,
      createdBy: req.user._id,
      teamMembers: [req.user._id],
    });

    res.status(201).json(project);
  } catch (error) {
    console.log("CREATE PROJECT ERROR:", error);
    res.status(500).json(error.message);
  }
};

// Get My Projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      teamMembers: req.user._id,
    })
      .populate("teamMembers", "name email")
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    console.log("GET PROJECT ERROR:", error);
    res.status(500).json(error.message);
  }
};

// Delete Project
exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json("Project deleted");
  } catch (error) {
    console.log("DELETE PROJECT ERROR:", error);
    res.status(500).json(error.message);
  }
};

exports.addMember = async (req, res) => {
  try {
    const { userId } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json("Project not found");
    }

    // 🔥 prevent duplicate
    if (project.teamMembers.includes(userId)) {
      return res.status(400).json("User already added");
    }

    project.teamMembers.push(userId);
    await project.save();

    res.json(project);

  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getteamMembers = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("teamMembers", "name email avatar");

    if (!project) {
      return res.status(404).json("Project not found");
    }

    res.json(project.teamMembers);

  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("teamMembers", "name email"); // 🔥 important

    if (!project) {
      return res.status(404).json("Project not found");
    }

    res.json(project);
  } catch (err) {
    res.status(500).json(err.message);
  }
};