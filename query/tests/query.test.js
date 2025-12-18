const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const DB = {};

function handleEvents(type, data) {
  if (type === 'postCreated') {
    DB[data.id] = { id: data.id, title: data.title, comments: [] };
  }
}

app.get('/posts', (req, res) => {
  res.status(200).json(DB);
});

describe('Query Service', () => {
  it('should handle postCreated event', () => {
    handleEvents('postCreated', { id: '1', title: 'Test Post' });
    expect(DB['1'].title).toBe('Test Post');
    expect(DB['1'].comments).toEqual([]);
  });

  it('should get posts', async () => {
    const res = await request(app).get('/posts');
    expect(res.statusCode).toBe(200);
    expect(res.body['1'].title).toBe('Test Post');
  });
});
