const EventEmitter = require('events');

class Logger extends EventEmitter {
  log(message) {
    this.emit('message', `>>> data: ${message}, date: ${Date.now()}`);
  }
}

const logger = new Logger();

logger.on('message', (data) => console.log(data));

logger.log({ string: 'Hello Logger' });
