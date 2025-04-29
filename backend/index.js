const express = require('express');
const cors = require('cors');
const users = require('./users');

const app = express();
const PORT = 5000;


const corsOptions = {
    origin: ['http://localhost:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

// Register ruta
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;

  // Provjeri postoji li već korisnik
  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  users.push({ email, password });
  return res.json({ message: 'Registration successful' });
});

// Login ruta
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  return res.json({ message: 'Login successful', token: 'fake-jwt-token' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
