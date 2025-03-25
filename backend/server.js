require("dotenv").config();
const express = require("express");
const cors = require("cors");
const todosRoutes = require("./routes/todoRoutes");

const connectDB = require("./db");

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", todosRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port 3001");
});
