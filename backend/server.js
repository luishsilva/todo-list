require("dotenv").config();
const express = require("express");
const cors = require("cors");
const todosRoutes = require("./routes/todoRoutes");

const connectDB = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", todosRoutes);

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
