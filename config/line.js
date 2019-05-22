const path = require('path');
const lineBot = require('@line/bot-sdk');
const config = require(path.resolve('config/config'));
const logger = require(path.resolve('config/logger')).getLogger('app');

logger.info(config.line);

module.exports = {
  middleware: lineBot.middleware(config.line),
  client: new lineBot.Client(config.line)
};
