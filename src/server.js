const fastify = require("fastify");
const controller = require("./controller");

const server = fastify({logger: true});

server.post('/task', controller.create );
server.get('/task/:id', controller.getById );
server.put('/task/:id', controller.updateById );
server.get('/tasks', controller.getAll );
server.delete('/task/:id', controller.deleteById );

module.exports = server;
