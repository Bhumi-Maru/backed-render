const projectModel = require("../models/Project");

const getAllProject = async (req, res) => {
  try {
    const data = await projectModel.find();
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching project", error });
  }
};

const createProject = async (req, res) => {
  const { projectName, description, startDate, endDate, status } = req.body;

  try {
    const newProject = await projectModel.create({
      projectName,
      description,
      startDate,
      endDate,
      status,
    });

    res.status(201).json({
      message: "Project created successfully!",
      newProject,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating project", error });
  }
};

module.exports = { createProject, getAllProject };
