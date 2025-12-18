const request = require('supertest'); 
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Временное хранилище для постов
let posts = [];

// Создание нового поста
app.post("/post/create", (req, res) => {
  posts.push(req.body);
  res.status(201).json({ message: "post created successfully", data: req.body });
});

// Получение всех постов
app.get("/post", (req, res) => {
  res.status(200).json(posts);
});

// Тесты
describe("Post Service", () => {
  // Очищаем посты перед каждым тестом
  beforeEach(() => {
    posts = [];
  });

  it("should create a new post", async () => {
    const response = await request(app)
      .post("/post/create")
      .send({ title: "Test post" });
    
    expect(response.statusCode).toBe(201);
    expect(response.body.data.title).toBe("Test post");
  });

  it("should return all posts", async () => {
    // Создаём тестовый пост перед GET
    await request(app).post("/post/create").send({ title: "Another post" });

    const response = await request(app).get("/post");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);           // проверяем, что есть 1 пост
    expect(response.body[0].title).toBe("Another post");
  });
});
