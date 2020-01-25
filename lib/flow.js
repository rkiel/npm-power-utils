let lib;

function _reducer(accum, elem) {
  return elem(accum);
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
  if (synchronous.length > 0) {
    [first, ...rest] = synchronous;
    return rest.reduce(lib._reducer, first(...args));
  }
}

lib = {
  _something,
  _reducer,
  flow
};
module.exports = lib.flow;
module.exports.lib = lib;
