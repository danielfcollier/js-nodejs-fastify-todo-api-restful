const { test } = require('tap');

const httpStatus = require('./httpStatus');
const taskStatus = require('./taskStatus');

const TodoList = require('./TodoList');

test('should create a new task', async (t) => {
  const { task, status } = TodoList.Create('Create');

  t.equal(task.name, 'Create');
  t.equal(status, httpStatus.created);
});

test('should not create a new task', async (t) => {
  const { status } = TodoList.Create('');

  t.equal(status, httpStatus.badRequest);
});

test('should not create a new task', async (t) => {
  const { status } = TodoList.Create();

  t.equal(status, httpStatus.badRequest);
});

test('should read a task', async (t) => {
  const { task } = TodoList.Create('Read');
  const data = TodoList.Read(task);

  t.equal(data.task.id, task.id);
  t.equal(data.task.name, task.name);
  t.equal(data.status, httpStatus.ok);
});

test('should not found a task', async (t) => {
  const { status } = TodoList.Read({ id: '' });

  t.equal(status, httpStatus.notFound);
});

test('should update', async (t) => {
  const { task } = TodoList.Create('Update');
  const data = TodoList.Update(task, {
    name: 'Updated Task',
    status: taskStatus.done,
  });

  t.equal(data.status, httpStatus.ok);
  t.equal(data.task.name, 'Updated Task');
  t.equal(data.task.status, taskStatus.done);
});

test('should delete a task', async (t) => {
  const { task } = TodoList.Create('Delete');
  const { status } = TodoList.Delete(task);
  const dataRead = TodoList.Read(task);

  t.equal(status, httpStatus.deleted);
  t.equal(dataRead.status, httpStatus.notFound);
});

test('should not delete a task', async (t) => {
  const { task } = TodoList.Create('Delete');
  TodoList.Delete(task);
  const { status } = TodoList.Delete(task);

  t.not(status, httpStatus.ok);
  t.equal(status, httpStatus.badRequest);
});
