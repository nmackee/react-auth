const express = require('express');
const app = express();
const cors = require('cors');

const users = require('./users');

const PORT = 8000;

app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

// MEMO: エンドポイント「/api/authlogin」はapplication/x-www-form-urlencodedで送信
app.use('/api/auth/login', express.urlencoded({ extended: true }));
// MEMO: 上記以外はapplication/jsonで
app.use(/\/((?!api\/auth\/login).)*/, express.json());

// BOOT
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

// AUTH
app.post('/api/auth/login', (req, res) => {
  users.login(req, res);
});

// READ
// app.get('/api/some_resource', (req, res) => {
//   someResource.get(req, res);
// });
