let lib;

const _promise = require('../promise');
const _methods = require('./methods');

function _syncReducer(result, f) {
  return f(result);
}

function _asyncReducer(promise, f) {
  return promise.then(f);
}

function _toArray(config) {
  if (config) {
    return Array.isArray(config) ? config : [config];
  } else {
    return [];
  }
}

function _returnResult(config) {
  return function(result) {
    return config.output === undefined ? result : config.output;
  };
}

function _doSyncOnly(config) {
  const [syncFirst, ...syncRest] = config.now;
  const result = syncRest.reduce(lib._syncReducer, syncFirst(...config.input));
  return lib._returnResult(config)(result);
}

function _addCatch(config, promise) {
  return config.error ? promise.catch(config.error) : promise;
}

function _firstPromise(config, asyncFirst) {
  return lib._promise
    .resolve(config)
    .then(config => asyncFirst(...config.input));
}

function _doAsyncOnly(config) {
  const [asyncFirst, ...asyncRest] = config.promise;

  const promise = asyncRest
    .reduce(lib._asyncReducer, lib._firstPromise(config, asyncFirst))
    .then(lib._returnResult(config));
  return lib._addCatch(config, promise);
}

function _init(config) {
  const _input = lib._toArray(config.input);
  const _now = lib._toArray(config.now);
  const _promise = lib._toArray(config.promise);
  return Object.assign({}, config, {
    input: _input,
    now: _now,
    promise: _promise
  });
}

function flow(config) {
  if (!config) return;

  const _config = lib._init(config);

  if (_config.promise.length > 0) {
    return lib._doAsyncOnly(_config);
  } else if (_config.now.length > 0) {
    return lib._doSyncOnly(_config);
  } else {
    return lib._returnResult(_config)(undefined);
  }
}

lib = _methods({
  normal: {
    _init,
    _promise,
    _toArray,
    _addCatch,
    _firstPromise,
    _asyncReducer,
    _syncReducer,
    _doSyncOnly,
    _doAsyncOnly,
    _returnResult,
    flow
  }
});

module.exports = lib.flow;
module.exports.lib = lib;
