// taskController.js

const { Task } = require('../models');

// Lấy tất cả task
const getAllTasks = async (req, res) => {
  const tasks = await Task.findAll();
  return res.json(tasks);
};

// Thêm mới task
const createTask = async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.create({ title, description });
  return res.status(201).json(task);
};

// Cập nhật task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const task = await Task.findByPk(id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  task.title = title || task.title;
  task.description = description || task.description;
  task.status = status || task.status;
  await task.save();

  return res.json(task);
};

// Xóa task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findByPk(id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  await task.destroy();
  return res.status(204).json();
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
