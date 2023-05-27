const express = require('express');
const mongoose = require('mongoose');
const {
  ERROR_CODE_BAD_REQUEST,
} = require('./utils/errors');

const app = express();

const { port = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/aroundb');

app.use((req, res, next) => {
  req.user = {
    _id: '646d267a32ac7f6b50967277',
  };
  next();
});

app.use(express.json()); // Parse request bodies as JSON

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use('/', usersRouter);
app.use(cardsRouter);

app.use('/', (req, res) => {
  res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'Requested resource not found' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
