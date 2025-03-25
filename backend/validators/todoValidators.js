const Joi = require("joi");

const todoSchema = Joi.object({
  name: Joi.string().required(),
  isComplete: Joi.boolean().optional(),
}).unknown(true);

function validateTodo(todo) {
  return todoSchema.validate(todo);
}

module.exports = { validateTodo };
