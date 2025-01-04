require('dotenv').config();
const { Sequelize } = require('sequelize');

// Khởi tạo Sequelize với thông tin từ file .env
const sequelize = new Sequelize(
  process.env.DB_NAME,    // Tên database
  process.env.DB_USER,    // Tên người dùng
  process.env.DB_PASSWORD, // Mật khẩu
  {
    host: process.env.DB_HOST,  // Địa chỉ máy chủ (ví dụ: localhost)
    dialect: 'mssql',           // Loại cơ sở dữ liệu
    port: process.env.DB_PORT,  // Cổng SQL Server
    logging: false,             // Tắt log SQL query
  }
);

// Kiểm tra kết nối
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
