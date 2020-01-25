let lib;

function _syncReducer(result, f) {
  return f(result);
}

function _asyncReducer(promise, f) {
  return promise.then(f);
}

function _something(config) {
  if (config) {
    return Array.isArray(config) ? config : [config];
  } else {
    return [];
  }
}

function flow(config) {
  const args = lib._something(config.inputs);
  const synchronous = lib._something(config.now);
  const asynchronous = lib._something(config.then);
  if (asynchronous.length > 0 && synchronous.length > 0) {
    [syncFirst, ...syncRest] = synchronous;
    const syncResult = syncRest.reduce(lib._syncReducer, syncFirst(...args));
    [asyncFirst, ...asyncRest] = asynchronous;
    return asyncRest
      .reduce(lib._asyncReducer, asyncFirst(syncResult))
      .then(result => (config.returns === undefined ? result : config.returns));
  } else if (asynchronous.length > 0) {
    [asyncFirst, ...asyncRest] = asynchronous;
    return asyncRest
      .reduce(lib._asyncReducer, asyncFirst(...args))
      .then(result => (config.returns === undefined ? result : config.returns));
  } else if (synchronous.length > 0) {
    [syncFirst, ...syncRest] = synchronous;
    return syncRest.reduce(lib._syncReducer, syncFirst(...args));
  }
}

lib = {
  _something,
  _syncReducer,
  flow
};

module.exports = lib.flow;
module.exports.lib = lib;
