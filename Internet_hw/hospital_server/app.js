const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const appointments = require('./routes/appointments');
const days = require('./routes/days');

const corsOptions = {
  origin: ['http://localhost:3001'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'origin', 'x-access-token'],
  credentials: true,
};

const app = express();

app.use('*', cors(corsOptions));

const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/clinic', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use('/appointments', appointments);
app.use('/days', days);

// app.use((err, req, res, next) => {
//   const { statusCode = 500, message } = err;

//   res.status(statusCode).send({
//     message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
//   });

//   next();
// });

app.listen(PORT, () => {
  console.log(`Server has started on http://localhost:${PORT}`);
});
