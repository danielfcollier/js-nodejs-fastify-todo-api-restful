const TodoList = require('../model/TodoList');

const create = (req, res) => {
  const { body } = req;
  const { name } = body;
  const result = TodoList.Create(name);

  return res
    .status(result.status)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(result);
};

const getById = (req, res) => {
  const { params } = req;
  const { id } = params;
  const result = TodoList.Read({ id });

  return res
    .status(result.status)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(result);
};

const getAll = (req, res) => {
  const result = TodoList.ReadAll();

  return res
    .status(result.status)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(result);
};

const updateById = (req, res) => {
  const { params, body } = req;
  const { id } = params;
  const { name, status } = body;
  const result = TodoList.Update({ id }, { name, status });
  return res
    .status(result.status)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(result);
};

const deleteById = (req, res) => {
  const { params } = req;
  const { id } = params;
  const result = TodoList.Delete({ id });

  return res.status(result.status).send(result);
};

module.exports = {
  create,
  getById,
  getAll,
  updateById,
  deleteById,
};
