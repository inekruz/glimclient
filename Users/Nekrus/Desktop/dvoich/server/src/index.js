const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const sequelize = new Sequelize(process.env.DB_URL);

const User = sequelize.define('User', {
  login: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

app.post('/auth/register', async (req, res) => {
  const { login, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ login, password: hashedPassword });
    res.status(201).json({ message: 'Пользователь зарегистрирован', user });
  } catch (error) {
    res.status(400).json({ message: 'Ошибка регистрации', error });
  }
});

app.post('/auth/login', async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({ where: { login } });
  if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) return res.status(401).json({ message: 'Неверный пароль' });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.listen(3001, async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Сервер запущен на https://api.dvoich.ru');
  } catch (error) {
    console.error('Ошибка подключения к базе данных:', error);
  }
});
