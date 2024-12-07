const TaskModel = require("../models/Task");

// Create Task
const taskCreate = async (req, res) => {
  const { taskName, description, dueDate, priority } = req.body;

  try {
    const newTask = new TaskModel({
      taskName,
      description,
      dueDate,
      priority,
    });

    await newTask.save();

    return res.status(201).json({
      message: "Task created successfully!",
      newTask,
    });
  } catch (error) {
    console.error("task create error", error);
    return res.status(500).json({ message: "Error creating task", error });
  }
};

// Get All Tasks
const allTaskGet = async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching all tasks:", error);
    res.status(500).json({ message: "Error fetching all tasks", error });
  }
};

// Get Single Task by ID
const taskGet = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task); // Return the task details
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error });
  }
};

// Update Task
const taskUpdate = async (req, res) => {
  const { id } = req.params;
  const { taskName, description, dueDate, priority } = req.body;

  try {
    const task = await TaskModel.findByIdAndUpdate(
      id,
      { taskName, description, dueDate, priority },
      { new: true } // Return the updated document
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task updated successfully!",
      task,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Error updating task", error });
  }
};

// Delete Task
const taskDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await TaskModel.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task deleted successfully!",
      task,
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Error deleting task", error });
  }
};

module.exports = { taskCreate, taskGet, allTaskGet, taskUpdate, taskDelete };
