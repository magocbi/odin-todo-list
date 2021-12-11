const eventAggregator = (function () {
  // holds event: arrayofcallbacks pairs
  const events = {};

  function subscribe(event, handler) {
    if (events.hasOwnProperty(event)) events[event].push(handler);
    else events[event] = [handler];
  }

  function publish(event, args) {
    if (events.hasOwnProperty(event)) {
      for (const handler of events[event]) {
        handler(args);
      }
    }
  }

  function unsubscribe(event, handler) {
    console.log(events[event]);
    if (events.hasOwnProperty(event)) {
      const index = events[event].indexOf(handler);
      if (index >= 0) events[event].splice(index, 1);
      console.log(events[event]);
    }
  }

  return { subscribe, publish, unsubscribe };
})();

export default eventAggregator;
