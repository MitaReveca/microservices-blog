const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

// Импортируем твой app или создаём его заново
const app = express();
app.use(bodyParser.json());

// Подключаем твои маршруты
app.post("/post/create", (req, res) => {
  res.status(201).json({ message: "post created successfully", data: req.body });
});

describe("Post Service", () => {
  it("should create a new post", async () => {
    const response = await request(app)
      .post("/post/create")
      .send({ title: "Test post" });
    
    expect(response.statusCode).toBe(201);
    expect(response.body.data.title).toBe("Test post");
  });

  it("should return all posts", async () => {
    const response = await request(app).get("/post");
    expect(response.statusCode).toBe(200);
  });
});
