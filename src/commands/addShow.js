const max50 = str => str.length <= 50;

module.exports = function addShow(eventStore, { title, time, host, location }) {
  if (!title || !max50(title)) {
    throw new Error(`title can't be longer than 50 characters`);
  }

  if (!(time instanceof Date)) {
    throw new Error(`time must be a date object`);
  }

  if (!host || !max50(host)) {
    throw new Error(`host can't be longer than 50 characters`);
  }

  if (!location || !max50(location)) {
    throw new Error(`location can't be longer than 50 characters`);
  }

  eventStore.commit({
    type: 'ShowAdded',
    payload: {
      title,
      time,
      host,
      location
    }
  });
};
