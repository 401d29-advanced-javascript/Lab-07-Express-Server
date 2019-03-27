'use strict';

const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;

const errorHandler = require('./error-500.js');
const notFoundHandler = require('./error-404.js');

app.use(errorHandler);
// app.use('*', notFoundHandler);

let dateAndTime = (request, response, next) => {
  let date = new Date().toLocaleString();
  request.body = {requestTime: date};
  console.log('method, path, body: ', request.method, request.path, request.body);
  next();
};
app.use(dateAndTime);

let randomNumber = (request, response, next) => {
  let number = Math.floor((Math.random() * 100) + 1);
  request.body = number;
  console.log('random number: ', request.body);
  next();
};
app.use('/c', randomNumber);


let squareNumber = (number) => {
  let square = (number * number);
  return (request, response, next) => {
    request.body.number = square;
    console.log('number: ', request.body);
    next();
  };
};
app.use('/b', squareNumber(6));


app.get('/a', (req,res) => {
  res.status(200).send('Route A');
});

app.get('/b', (req,res) => {
  res.status(200);
  res.send('Route B');
});

app.get('/c', (req,res) => {
  res.status(200).send('Route C');
});

app.get('/d', (req,res) => {
  res.status(200).send('Route D');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));