const crypto = require('crypto');

const httpStatus = require('./httpStatus');
const taskStatus = require('./taskStatus');

global.tasks = [];

class TodoList {
  static Create(name) {
    const taskCreator = (name) => {
      return {
        name,
        id: crypto.randomUUID(),
        status: taskStatus.todo,
      };
    };

    if (name) {
      const newTask = taskCreator(name);
      tasks.push(newTask);

      return {
        status: httpStatus.created,
        task: newTask,
      };
    }

    return { status: httpStatus.badRequest, message: 'Bad Request!' };
  }

  static Read({ id }) {
    const [filteredTask] = tasks.filter((task) => task.id === id);
    if (filteredTask) {
      return { status: httpStatus.ok, task: filteredTask };
    }

    return { status: httpStatus.notFound, message: 'Not Found!' };
  }

  static Update({ id }, updates) {
    const { task, status } = this.Read({ id });
    if (status === httpStatus.ok) {
      const updatedTask = { ...task, ...updates };
      this.Delete(task);
      tasks.push(updatedTask);

      return { status: httpStatus.ok, task: updatedTask };
    }

    return { status: httpStatus.notFound, message: 'Not Found!' };
  }

  static Delete({ id }) {
    const { status } = this.Read({ id });
    if (status === httpStatus.ok) {
      tasks = tasks.filter((task) => task.id !== id);

      return { status: httpStatus.deleted, message: 'Deleted!' };
    }

    return { status: httpStatus.badRequest, message: 'Bad Request!' };
  }

  static ReadAll() {
    return { tasks, status: httpStatus.ok };
  }
}

module.exports = TodoList;
