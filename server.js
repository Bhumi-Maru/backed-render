const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const authRoute = require("./route/authRoute");
const taskRouter = require("./route/taskRoute");
const projectRouter = require("./route/projectRoute");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/api/tasks", taskRouter);
app.use("/api/project", projectRouter);

app.get("/", (req, res) => {
  res.send("HEllo");
});

app.listen(7000, () => {
  console.log("7000");
});
