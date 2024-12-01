const pool = require('../config/database');

const createUser = async (login, hashedPassword) => {
  const result = await pool.query(
    'INSERT INTO users (login, password) VALUES ($1, $2) RETURNING *',
    [login, hashedPassword]
  );
  return result.rows[0];
};

const findUserBylogin = async (login) => {
  const result = await pool.query('SELECT * FROM users WHERE login = $1', [login]);
  return result.rows[0];
};

module.exports = { createUser, findUserBylogin };
