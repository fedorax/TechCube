'use strict';

const path = require('path');
const line = require(path.resolve('config/line'));
const logger = require(path.resolve('config/logger')).getLogger('app');
const lineCtrl = require(path.resolve('app/controllers/line.controller'));

module.exports = function (app) {
  app.post('/webhook', line.middleware, (req, res) => {
    logger.info(JSON.stringify(req.body));

    Promise
      .all(req.body.events.map(lineCtrl.handleEvent))
      .then((result) => res.json(result));
  });

};
