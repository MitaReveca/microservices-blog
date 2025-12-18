const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

jest.mock('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const event = req.body;
  if (event.type === 'commentCreated') {
    const status = event.data.content.includes('orange') ? 'rejected' : 'approved';
    await axios.post('http://localhost:8005/events', { type: 'commentModerated', data: { ...event.data, status } });
  }
  res.send({});
});

describe('Moderation Service', () => {
  it('should approve non-offensive comment', async () => {
    const res = await request(app)
      .post('/events')
      .send({ type: 'commentCreated', data: { content: 'Hello' } });
    expect(res.statusCode).toBe(200);
  });

  it('should reject offensive comment', async () => {
    const res = await request(app)
      .post('/events')
      .send({ type: 'commentCreated', data: { content: 'orange bad' } });
    expect(res.statusCode).toBe(200);
  });
});
