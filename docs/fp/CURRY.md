## curry

Here are some random functions that will be used to illustrate how `curry` works.

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

A function that has zero parameters will simply be passed through and returned.

```JavaScript
const f = fp.curry(zero)
f() // 0
```

A function that has only a single parameter will be wrapped inside another function.

```JavaScript
const f = fp.curry(double)
f(3)() // 6
```

A function that has more than one parameter will be wrapped inside other functions until all the parameters have been given.

```JavaScript
const f = fp.curry(add)
f(2, 3) // 5
f(2)(3) // 5
```
