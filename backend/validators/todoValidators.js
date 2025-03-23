const Joi = require("joi");

const todoSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  isComplete: Joi.boolean().required(),
});

function validateTodo(todo) {
  return todoSchema.validate(todo);
}

module.exports = { validateTodo };
