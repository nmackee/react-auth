const data = require('./data');

const login = (req, res) => {
  const exists = data.some(
    (user) =>
      req.body.username === user.email && req.body.password === user.password
  );
  if (!exists) {
    res.status(401).send({ detail: 'Incorrect username or password' });
  }
  res.send({ isAuthenticated: true });
};

const getUser = (req, res) => {
  res.send(data);
};

module.exports = { login, getUser };
