const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/jirabyme");

const db = mongoose.connection;

db.on("connected", () => {
  console.log("mongodb connected");
});

module.exports = db;
