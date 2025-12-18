const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

jest.mock('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', async (req, res) => {
  const event = req.body;
  events.push(event);
  try {
    await Promise.all([
      axios.post('http://localhost:8001/events', event),
      axios.post('http://localhost:8002/events', event),
      axios.post('http://localhost:8003/events', event),
      axios.post('http://localhost:8004/events', event),
    ]);
  } catch {}
  res.send({});
});

describe('Event Bus', () => {
  it('should receive and store an event', async () => {
    const testEvent = { type: 'test', data: { msg: 'hello' } };
    const res = await request(app).post('/events').send(testEvent);
    expect(res.statusCode).toEqual(200);
    expect(events).toContainEqual(testEvent);
  });
});
