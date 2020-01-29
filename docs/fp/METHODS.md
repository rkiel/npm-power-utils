## methods

Here are some random functions that will be used to illustrate how `methods` works.

```JavaScript
function zero() {
  return 0;
}
function add (a , b) {
  return a + b;
}

function double (x) {
  return x * 2
}
```

Load the `fp` part of `power-utils`.

```JavaScript
const { fp } = require('power-utils');
```

Creates an empty object by default.

```JavaScript
const lib = fp.methods()
lib // {}
```

All functions defined in the `normal` object will be passed through.

```JavaScript
const lib = fp.methods({
  normal: {
    add,
    double
  }
})

lib.add(2,3) // 5
lib.double(3) // 6
lib.normal // undefined
```

All functions defined in the `curry` object will be passed through and wrapped in `curry`.

```JavaScript
const lib = fp.methods({
  curry: {
    add,
    double
  }
})

lib.add(2,3) // 5
lib.add(2)(3) // 5
lib.double(3)() // 6
lib.curry // undefined
```

Both `normal` and `curry` can be defined.

```JavaScript
const lib = fp.methods({
  curry: {
    add
  },
  normal: {
    double
  }
})

lib.double(3) // 6
lib.add(2,3) // 5
lib.add(2)(3) // 5
lib.curry // undefined
lib.normal // undefined
```
