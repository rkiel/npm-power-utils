const immer = require('immer');
const Immutable = require('./Immutable');

function use(state, ...fields) {
  const updatedState = immer.produce(state, (draft) => {
    fields.forEach((field) => {
      if (draft[field] === undefined) {
        draft[field] = {};
      }
    });
  });

  return Object.keys(updatedState).reduce((newState, key) => {
    newState[key] = new Immutable(updatedState, key);
    return newState;
  }, {});
}

module.exports = use;
