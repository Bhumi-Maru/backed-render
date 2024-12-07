const express = require("express");
const {
  taskCreate,
  taskGet,
  allTaskGet,
  taskUpdate,
  taskDelete,
} = require("../controllers/taskController");

const taskRouter = express.Router();

taskRouter.post("/task-create", taskCreate);
taskRouter.get("/task", allTaskGet);
taskRouter.get("/:id", taskGet);
taskRouter.delete("/:id", taskDelete);
taskRouter.put("/:id", taskUpdate);

module.exports = taskRouter;
