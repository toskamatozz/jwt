const express = require('express');
const controller = require('controllers/auth');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/login', controller.login);
router.post('/register', controller.register);

module.exports = router;
