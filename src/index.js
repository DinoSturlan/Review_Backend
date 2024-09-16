const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const cors = require('cors');


const app = express();
app.use(express.json());


app.use(cors());

connectDB();

app.use('/api/auth', authRoutes);

const postRoutes = require('./routes/postRoutes');
app.use('/api/posts', postRoutes);

app.use('/api/profile', profileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(3000, () => console.log('Server running on http://localhost:3000'));


