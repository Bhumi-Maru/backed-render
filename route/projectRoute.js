const express = require("express");
const {
  createProject,
  getAllProject,
} = require("../controllers/projectController");

const projectRouter = express.Router();

projectRouter.post("/create", createProject);
projectRouter.get("/", getAllProject);

module.exports = projectRouter;
