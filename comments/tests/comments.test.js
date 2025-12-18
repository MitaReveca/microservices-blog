const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const DB = {};

// Создание комментария
app.post('/posts/:id/comments', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const postId = req.params.id;
  const { content } = req.body;
  const comments = DB[postId] || [];
  comments.push({ id, content });
  DB[postId] = comments;
  res.status(200).json({ message: "comment created", data: { id, content } });
});

// Получение всех комментариев для поста
app.get('/posts/:id/comments', (req, res) => {
  const postId = req.params.id;
  const comments = DB[postId] || [];
  res.status(200).json(comments);
});

describe("Comments Service", () => {
  it("should create a comment", async () => {
    const response = await request(app)
      .post("/posts/1/comments")
      .send({ content: "Test comment" });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.content).toBe("Test comment");
  });

  it("should return comments for post", async () => {
    const response = await request(app).get("/posts/1/comments");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });
});
