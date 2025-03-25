const request = require("supertest");
const app = require("../server");
const TodoModel = require("../models/Todo");

let server;

describe("Test Todo API routes", () => {
  beforeAll((done) => {
    server = app.listen(3002, () => {
      console.log("Test server running on port 3002");
      done();
    });
  });

  beforeEach(async () => {
    await TodoModel.deleteMany();
  });

  afterAll((done) => {
    server.close(() => {
      console.log("Test server stopped");
      done();
    });
  });

  // Testing GET method /api, fetching all todos
  it("Should fetch all todos", async () => {
    const todoName = "Test Todo";
    const todo = new TodoModel({ name: todoName, isComplete: false });
    await todo.save();

    const response = await request(app).get("/api");

    expect(response.status).toBe(200);
    expect("Content-Type", "/json");
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].toBe(todoName));
  });
});
