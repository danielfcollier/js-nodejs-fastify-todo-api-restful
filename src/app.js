const server = require('./server');

const port = process.env.PORT || '3000';
const host = '0.0.0.0';

const start = async () => {
  try {
    await server.listen({ port, host });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

module.exports = start;
