require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todosRoutes = require("./routes/todoRoutes");
// const TodoModel = require("./models/Todo");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

app.use("/api", todosRoutes);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
