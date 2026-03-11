const use = require('../../../lib/state/use');

describe('use', () => {
  it('should create missing objects', () => {
    const state = {};
    const newState = use(state, 'geddy', 'alex');
    expect(Object.keys(newState).sort()).toEqual(['alex', 'geddy']);
    expect(Object.keys(state)).toEqual([]);
  });

  it('should not create existing objects', () => {
    const state = { alex: { one: 1 } };
    const newState = use(state, 'geddy', 'alex');
    expect(Object.keys(newState).sort()).toEqual(['alex', 'geddy']);
    expect(Object.keys(state)).toEqual(['alex']);
  });
});
