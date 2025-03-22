const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/ratehub")
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

app.get("/api", async (request, response) => {
  try {
    const todos = await TodoModel.find();
    response.json(todos);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.post("/api", async (request, response) => {
  try {
    const newTodo = new TodoModel(request.body);
    await newTodo.save();
    response.status(201).json(newTodo);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.put("/api/:id", async (request, response) => {
  try {
    const updatedTodo = await TodoModel.findOneAndUpdate(
      { id: request.params.id },
      {
        name: request.body.name,
        isComplete: request.body.isComplete,
      },
      { new: true }
    );

    if (!updatedTodo) {
      return response.status(404).json({ error: "Todo not found" });
    }

    response.json(updatedTodo);
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

app.delete("/api/:id", async (request, response) => {
  try {
    const deleteTodo = await TodoModel.findOneAndDelete({
      id: request.params.id,
    });

    if (!deleteTodo) {
      return response.status(404).json({ error: "Todo not found" });
    }

    response.json({ message: "Todo deleted successfully", deleteTodo });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
