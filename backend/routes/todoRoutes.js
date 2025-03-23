const express = require("express");
const router = express.Router();
const { validateTodo } = require("../validators/todoValidators");

const TodoModel = require("../models/Todo");

router.get("/", async (request, response) => {
  try {
    const todos = await TodoModel.find();
    response.status(200).json(todos);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.post("/", async (request, response) => {
  const { error } = validateTodo(request.body);
  if (error)
    return response.status(400).json({ error: error.details[0].message });

  try {
    const newTodo = new TodoModel(request.body);
    await newTodo.save();
    response.status(201).json(newTodo);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (request, response) => {
  const { error } = validateTodo(request.body);
  if (error)
    return response.status(400).json({ error: error.details[0].message });

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

    response.status(200).json(updatedTodo);
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (request, response) => {
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

module.exports = router;
