const events = require('../data/events');

function createEvent(event) {
  const createdEvent = {
    ...event,
    timestamp: new Date().toISOString()
  };

  events.push(createdEvent);

  return createdEvent;
}

module.exports = createEvent;