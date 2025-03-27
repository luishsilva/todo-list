const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const Todo = require("../../models/Todo");

describe("Todo Model", () => {
  const id = uuid();
  it("should save a todo to the database", async () => {
    const todo = new Todo({
      id: id,
      name: "New Item test",
      isComplete: false,
    });
    await todo.save();

    const foundTodo = await Todo.findOne({ id: id });
    expect(foundTodo).not.toBeNull();
    expect(foundTodo.id).toBe(id);
  });
});
