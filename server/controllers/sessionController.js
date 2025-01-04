// sessionController.js

const { Session } = require('../models');

// Lấy tất cả session
const getAllSessions = async (req, res) => {
  const sessions = await Session.findAll();
  return res.json(sessions);
};

// Tạo session mới
const createSession = async (req, res) => {
  const { task_id, start_time, end_time, duration, is_successful } = req.body;
  const session = await Session.create({ task_id, start_time, end_time, duration, is_successful });
  return res.status(201).json(session);
};

// Cập nhật session
const updateSession = async (req, res) => {
  const { id } = req.params;
  const { start_time, end_time, duration, is_successful } = req.body;

  const session = await Session.findByPk(id);
  if (!session) {
    return res.status(404).json({ message: 'Session not found' });
  }

  session.start_time = start_time || session.start_time;
  session.end_time = end_time || session.end_time;
  session.duration = duration || session.duration;
  session.is_successful = is_successful || session.is_successful;
  await session.save();

  return res.json(session);
};

// Xóa session
const deleteSession = async (req, res) => {
  const { id } = req.params;

  const session = await Session.findByPk(id);
  if (!session) {
    return res.status(404).json({ message: 'Session not found' });
  }

  await session.destroy();
  return res.status(204).json();
};

module.exports = { getAllSessions, createSession, updateSession, deleteSession };
