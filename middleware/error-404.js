'use strict';

module.exports = (request, response, next) => {
  response.status(404);
  response.send('From error-404.js: Cannot Be Found');
  response.end();
};