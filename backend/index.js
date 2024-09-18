const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routers/authRoutes');
const employeeRoutes = require('./routers/employeeRoutes');
require('dotenv').config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
