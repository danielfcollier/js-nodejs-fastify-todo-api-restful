const { test } = require('tap');
const server = require('../src/server');
const httpStatus = require('../src/model/httpStatus');

test('/task - POST - Should create a task', async (t) => {
  const endpoint = '/task';
  const req = {
    name: 'Task Create',
  };
  const res = await server.inject({
    method: 'POST',
    url: endpoint,
    payload: req,
  });
  const result = JSON.parse(res.body);

  t.equal(res.statusCode, httpStatus.created);
  t.equal(result.task.name, req.name);
});

test('/task - POST - Should not create a task for empty task name', async (t) => {
  const endpoint = '/task';
  const req = {
    name: '',
  };
  const res = await server.inject({
    method: 'POST',
    url: endpoint,
    payload: req,
  });

  t.equal(res.statusCode, httpStatus.badRequest);
});

test('/task - POST - Should not create a task for null task name', async (t) => {
  const endpoint = '/task';
  const req = {
    name: null,
  };
  const res = await server.inject({
    method: 'POST',
    url: endpoint,
    payload: req,
  });

  t.equal(res.statusCode, httpStatus.badRequest);
});

test('/task - GET - Should read a created task', async (t) => {
  const endpoint = '/task';
  const createdReq = {
    name: 'Task Read',
  };
  const createRes = await server.inject({
    method: 'POST',
    url: endpoint,
    payload: createdReq,
  });
  const taskCreated = JSON.parse(createRes.body);

  const res = await server.inject({
    method: 'GET',
    url: `${endpoint}/${taskCreated.task.id}`,
  });
  const result = JSON.parse(res.body);

  t.equal(res.statusCode, httpStatus.ok);
  t.equal(result.task.name, createdReq.name);
});

test('/task - GET - Should not found task', async (t) => {
  const endpoint = '/task';

  const res = await server.inject({
    method: 'GET',
    url: `${endpoint}/${0}`,
  });

  t.equal(res.statusCode, httpStatus.notFound);
});

test('/task - PUT - Should update a created task', async (t) => {
  const endpoint = '/task';
  const createReq = {
    name: 'Task Update',
  };
  const createRes = await server.inject({
    method: 'POST',
    url: endpoint,
    payload: createReq,
  });
  const taskCreated = JSON.parse(createRes.body);

  const req = {
    name: 'Requested Task Updated',
  };
  const res = await server.inject({
    method: 'PUT',
    url: `${endpoint}/${taskCreated.task.id}`,
    payload: req,
  });
  const result = JSON.parse(res.body);

  t.equal(res.statusCode, httpStatus.ok);
  t.equal(result.task.name, req.name);
});

test('/task - DELETE - Should delete a created task', async (t) => {
  const endpoint = '/task';
  const createReq = {
    name: 'Task Delete',
  };
  const createRes = await server.inject({
    method: 'POST',
    url: endpoint,
    payload: createReq,
  });
  const taskCreated = JSON.parse(createRes.body);

  const res = await server.inject({
    method: 'DELETE',
    url: `${endpoint}/${taskCreated.task.id}`,
  });

  t.equal(res.statusCode, httpStatus.deleted);
});

test('/tasks - GET - Should read all created tasks', async (t) => {
  const endpoint = '/tasks';

  const res = await server.inject({
    method: 'GET',
    url: `${endpoint}`,
  });
  const result = JSON.parse(res.body);

  t.equal(res.statusCode, httpStatus.ok);
  t.equal(result.tasks.length, 3);
});
