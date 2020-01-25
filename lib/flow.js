let lib;

const _promise = require("./promise");

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

function _bar(config) {
  const args = lib._something(config.in);
  const synchronous = lib._something(config.now);
  const asynchronous = lib._something(config.promise);

  [syncFirst, ...syncRest] = synchronous;
  [asyncFirst, ...asyncRest] = synchronous.concat(asynchronous);
  return asyncRest
    .reduce(lib._asyncReducer, asyncFirst(syncResult))
    .then(result => (config.out === undefined ? result : config.out));
}

function _asdf(config, result) {
  return config.out === undefined ? result : config.out;
}

function _doSyncAndAsync(config) {
  const args = lib._something(config.in);
  const synchronous = lib._something(config.now);
  const asynchronous = lib._something(config.promise);

  [syncFirst, ...syncRest] = synchronous;
  const firstResult = syncFirst(...args);

  return syncRest
    .contcat(asynchronous)
    .reduce(lib._asyncReducer, lib._promise.resolve(firstResult))
    .then(lib._asdf(config));
}

function _doSyncOnly(config) {
  const args = lib._something(config.in);
  const synchronous = lib._something(config.now);

  [syncFirst, ...syncRest] = synchronous;
  const result = syncRest.reduce(lib._syncReducer, syncFirst(...args));
  return lib._asdf(config, result);
}

function _doAsyncOnly(config) {
  const args = lib._something(config.in);
  const asynchronous = lib._something(config.promise);

  [asyncFirst, ...asyncRest] = asynchronous;
  return asyncRest
    .reduce(lib._asyncReducer, asyncFirst(...args))
    .then(lib._asdf(config));
}

function flow(config) {
  const args = lib._something(config.in);
  const synchronous = lib._something(config.now);
  const asynchronous = lib._something(config.promise);

  if (asynchronous.length > 0 && synchronous.length > 0) {
    return lib._doSyncAndAsync(config);
  } else if (asynchronous.length > 0) {
    return lob._doAsyncOnly(config);
  } else if (synchronous.length > 0) {
    return lib._doSyncOnly(config);
  }
}

lib = {
  _promise,
  _something,
  _syncReducer,
  _doSyncOnly,
  _doAsyncOnly,
  _doSyncAndAsync,
  _asdf,
  flow
};

module.exports = lib.flow;
module.exports.lib = lib;
