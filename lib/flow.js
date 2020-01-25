let lib;

const _promise = require("./promise");

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

function _returnResult(config, result) {
  return config.out === undefined ? result : config.out;
}

function _doSyncOnly(config) {
  [syncFirst, ...syncRest] = config.now;
  const result = syncRest.reduce(lib._syncReducer, syncFirst(...config.in));
  return lib._returnResult(config, result);
}

function _doAsyncOnly(config) {
  [asyncFirst, ...asyncRest] = config.promise;

  return asyncRest
    .reduce(
      lib._asyncReducer,
      lib._promise.resolve(config).then(config => asyncFirst(...config.in))
    )
    .then(lib._returnResult(config));
}

function _init(config) {
  const _in = lib._toArray(config.in);
  const _now = lib._toArray(config.now);
  const _promise = lib._toArray(config.promise);
  return Object.assign({}, config, {
    in: _in,
    now: _now,
    promise: _promise
  });
}

function flow(config) {
  const _config = lib._init(config);

  if (_config.promise.length > 0) {
    return lib._doAsyncOnly(_config);
  } else if (_config.now.length > 0) {
    return lib._doSyncOnly(_config);
  } else {
    return lib._returnResult(_config, null);
  }
}

lib = {
  _init,
  _promise,
  _toArray,
  _syncReducer,
  _doSyncOnly,
  _doAsyncOnly,
  _returnResult,
  flow
};

module.exports = lib.flow;
module.exports.lib = lib;
