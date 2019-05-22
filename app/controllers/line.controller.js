const path = require('path');
const line = require(path.resolve('config/line'));
exports.handleEvent = (event) => {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return line.client.replyMessage(event.replyToken, {
    type: 'text',
    text: '[TechCube]' + event.message.text
  });
};
