const express = require('express');
const app = express();
const { User, Task, Session } = require('./models');
const taskRoutes = require('./routes/taskRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());

// Đăng ký các route
app.use('/api/tasks', taskRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/auth', authRoutes);

// Kiểm tra kết nối DB
require('./config/db');

// Khởi động server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.use(express.json()); // Middleware để parse JSON.
app.use(express.urlencoded({ extended: true })); // Middleware để parse form data.
