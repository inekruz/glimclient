const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors({ origin: 'https://dvoich.ru' }));
app.use(helmet());

app.use('/api/auth', authRoutes);

app.listen(process.env.PORT || 5000, '127.0.0.1', () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});
