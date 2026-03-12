const use = require('../../../lib/state/use');

describe('use', () => {
  it('should create missing top-level objects', () => {
    const state = {};
    const newState = use(state, 'geddy', 'alex');
    expect(Object.keys(newState).sort()).toEqual(['alex', 'geddy']);
    expect(Object.keys(state)).toEqual([]);
  });

  it('should fail getting from a non-object', () => {
    const state = { integer: 1 };
    const { integer } = use(state);
    expect(() => integer.get('one')).toThrowError('Not an object');
  });

  it('should fail setting to a non-object', () => {
    const state = { integer: 1 };
    const { integer } = use(state);
    expect(() => integer.set('one', 2112)).toThrowError('Not an object');
  });

  it('should dereference one level without a value', () => {
    const state = {};
    const { integer } = use(state, 'integer');
    expect(integer.get('one')).toEqual(undefined);
  });

  it('should dereference one level with a value', () => {
    const state = { integer: 2112 };
    const { integer } = use(state);
    expect(integer.get()).toEqual(2112);
  });

  it('should initialize', () => {
    const state = { integer: 2112 };
    const { integer } = use(state);
    expect(integer.init(90210)).toEqual({ integer: 90210 });
    expect(state).toEqual({ integer: 2112 });
  });

  it('should not create existing objects', () => {
    const state = { alex: { one: 1 } };
    const newState = use(state, 'geddy', 'alex');
    expect(Object.keys(newState).sort()).toEqual(['alex', 'geddy']);
    expect(Object.keys(state)).toEqual(['alex']);
  });
});
