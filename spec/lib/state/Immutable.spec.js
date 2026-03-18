const Immutable = require('../../../lib/state/Immutable');

describe('Immutable', () => {
  let state, im;

  describe('WHEN state is empty', () => {
    beforeEach(() => (state = {}));
    beforeEach(() => (im = new Immutable(state, 'geddy')));
    afterEach(() => expect(state).toEqual({}));

    describe('get', () => {
      it('should define nothing by default', () => {
        expect(im.get()).toBeUndefined();
      });

      it('should dereference one level', () => {
        expect(im.get('one')).toBeUndefined();
      });

      it('should dereference multiple levels', () => {
        expect(im.get('one.two.three')).toBeUndefined();
      });

      it('should dereference one level with a default value', () => {
        expect(im.get('one', 1)).toEqual(1);
      });

      it('should dereference multiple levels with a default value', () => {
        expect(im.get('one.two.three', 3)).toEqual(3);
      });
    }); // get

    describe('initialize', () => {
      it('should initialize an integer', () => {
        expect(im.init(1)).toEqual({ geddy: 1 });
      });

      it('should initialize an array', () => {
        expect(im.init([1])).toEqual({ geddy: [1] });
      });

      it('should initialize an object', () => {
        expect(im.init({ one: 1 })).toEqual({ geddy: { one: 1 } });
      });

      it('should initialize a function', () => {
        expect(im.init((x) => x + x).geddy(2)).toEqual(4);
      });
    }); // initialize

    describe('assign', () => {
      it('should not assign if not an object', () => {
        expect(() => im.assign({ one: 1 })).toThrowError('Not an object');
      });
    }); // assign

    describe('set', () => {
      it('should set one level', () => {
        expect(im.set('one', 1)).toEqual({ geddy: { one: 1 } });
      });

      it('should set multiple levels', () => {
        expect(im.set('one.two.three', 3)).toEqual({ geddy: { one: { two: { three: 3 } } } });
      });
    }); // set
  }); // WHEN state is empty

  describe('WHEN state is not empty (simple)', () => {
    beforeEach(() => (state = { geddy: { two: 2 } }));
    beforeEach(() => (im = new Immutable(state, 'geddy')));
    afterEach(() => expect(state).toEqual({ geddy: { two: 2 } }));

    describe('get', () => {
      it('should the whole value', () => {
        expect(im.get()).toEqual({ two: 2 });
      });

      it('should dereference one level', () => {
        expect(im.get('one')).toBeUndefined();
      });

      it('should dereference multiple levels', () => {
        expect(im.get('one.two.three')).toBeUndefined();
      });

      it('should dereference one level with a default value', () => {
        expect(im.get('one', 1)).toEqual(1);
      });

      it('should dereference multiple levels with a default value', () => {
        expect(im.get('one.two.three', 3)).toEqual(3);
      });
    }); // get

    describe('initialize', () => {
      it('should initialize an integer', () => {
        expect(im.init(1)).toEqual({ geddy: 1 });
      });

      it('should initialize an array', () => {
        expect(im.init([1])).toEqual({ geddy: [1] });
      });

      it('should initialize an object', () => {
        expect(im.init({ one: 1 })).toEqual({ geddy: { one: 1 } });
      });

      it('should initialize a function', () => {
        expect(im.init((x) => x + x).geddy(2)).toEqual(4);
      });
    }); // initialize

    describe('assign', () => {
      it('should not assign if not an object', () => {
        expect(im.assign({ one: 1 })).toEqual({ geddy: { two: 2, one: 1 } });
      });
    }); // assign

    describe('set', () => {
      it('should set one level', () => {
        expect(im.set('two', 22)).toEqual({ geddy: { two: 22 } });
      });

      it('should set one level', () => {
        expect(im.set('one', 1)).toEqual({ geddy: { two: 2, one: 1 } });
      });

      it('should set multiple levels', () => {
        expect(im.set('one.two.three', 3)).toEqual({ geddy: { two: 2, one: { two: { three: 3 } } } });
      });
    }); // set

    describe('change', () => {
      it('should not change based on return value', () => {
        expect(
          im.change(() => {
            return { two: 22 };
          })
        ).toEqual({ geddy: { two: 2 } });
      });

      it('should set one level', () => {
        expect(
          im.change((geddy) => {
            geddy['two'] = 22;
            geddy['three'] = 33;
            geddy['four'] = { five: 55 };
          })
        ).toEqual({ geddy: { two: 22, three: 33, four: { five: 55 } } });
      });
    }); // change
  }); // WHEN state is not empty (simple)

  describe('WHEN state is not empty (complex)', () => {
    let alex, geddy;
    beforeEach(() => (alex = { alpha: 'a' }));
    beforeEach(() => (geddy = { beta: 'b', one: { gamma: 'g' } }));
    beforeEach(() => (state = { alex, geddy }));
    beforeEach(() => (im = new Immutable(state, 'geddy')));
    afterEach(() => expect(state).toEqual({ alex, geddy }));

    describe('get', () => {
      it('should work', () => {
        expect(im.get('beta', 1)).toEqual('b');
        expect(im.get('one', 1)).toEqual({ gamma: 'g' });
      });
      it('should work', () => {
        expect(im.get('two')).toEqual(undefined);
        expect(im.get('two', 1)).toEqual(1);
        expect(im.get('one.two', 2)).toEqual(2);
        expect(im.get('one.two.three', 3)).toEqual(3);
      });
      it('should work', () => {
        expect(im.get()).toEqual(geddy);
      });
    }); // get

    describe('set', () => {
      it('should work', () => {
        expect(im.set('one', 11)).toEqual({ alex, geddy: { beta: 'b', one: 11 } });
        expect(im.set('beta', 'B')).toEqual({ alex, geddy: { beta: 'B', one: { gamma: 'g' } } });
      });
      it('should work', () => {
        expect(im.set('two', 22)).toEqual({ alex, geddy: { beta: 'b', one: { gamma: 'g' }, two: 22 } });
        expect(im.set('one.gamma', 'G')).toEqual({ alex, geddy: { beta: 'b', one: { gamma: 'G' } } });
        expect(im.set('one.two', 222)).toEqual({ alex, geddy: { beta: 'b', one: { gamma: 'g', two: 222 } } });
        expect(im.set('one.two.three', 3333)).toEqual({
          alex,
          geddy: { beta: 'b', one: { gamma: 'g', two: { three: 3333 } } }
        });
      });
    }); // set
  }); //WHEN state is not empty (complex)
});
