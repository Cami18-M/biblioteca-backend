/**
 * Crea un objeto "query" que imita el comportamiento encadenable de Mongoose:
 * .select(), .sort(), .populate(), .exec() devuelven this, y el objeto es thenable (await funciona).
 */
const createMockQuery = (results) => {
  const q = {
    select: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    populate: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue(results),
    limit: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis()
  };
  // Hacer que el objeto sea thenable para que `await query` funcione directamente
  q.then = jest.fn((resolve) => {
    resolve(results);
  });
  return q;
};

module.exports = { createMockQuery };
