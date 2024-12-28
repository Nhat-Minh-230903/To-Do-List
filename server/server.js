const express = require('express');
const sql = require('mssql');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());

// SQL Server configuration
const dbConfig = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  server: process.env.SQL_SERVER,
  database: process.env.SQL_DATABASE,
  options: {
    encrypt: true, // Nếu bạn dùng Azure SQL
    integratedSecurity: true,  // Dùng Windows Authentication
    trustServerCertificate: true, // Để tránh lỗi chứng chỉ trong môi trường local
  },
};

// Test SQL Server connection
sql.connect(dbConfig)
  .then(() => console.log('Connected to SQL Server'))
  .catch((err) => console.log('SQL Server connection error:', err));

// Routes (Test route)
app.get('/', (req, res) => {
  res.send('Server is running and connected to SQL Server!');
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));