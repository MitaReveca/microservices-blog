export default {
  get: jest.fn(() =>
    Promise.resolve({
      data: {} // 👈 ВАЖНО: объект, а не массив
    })
  ),
  post: jest.fn(() =>
    Promise.resolve({
      data: {}
    })
  ),
};
