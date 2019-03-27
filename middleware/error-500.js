'use strict';

module.exports = (error, request, response, next) => {
  response.status(500);
  response.send('From error.js: ', error);
};