## flow

Here are some random functions that will be used to illustrate how `flow` works.

```JavaScript
function add (a , b) {
  return a + b;
}

function double (x) {
  return x * 2
}

function handleError(e) {
  console.log(e.message)
}
```

Load the `fp` part of `power-utils`.

```JavaScript
const { fp } = require('power-utils');
```

Nothing happens by default.

```JavaScript
fp.flow() // undefined
fp.flow({}) // undefined
```

Override the result.

```JavaScript
fp.flow({output: 400}) // 400
```

Pass a single input into a single function.

```JavaScript
fp.flow({
  input: 2,
  now: double
 }) // 4
```

Pass a single input into a single function. Override the result.

```JavaScript
fp.flow({
  input: 2,
  now: double,
  output: 400
}) // 400
```

Pass multiple inputs into a single function.

```JavaScript
fp.flow({
  input: [1,2],
  now: add
}) // 3
```

Pass multiple inputs into multiple functions.

```JavaScript
fp.flow({
  input: [1,2],
  now: [add, double]
}) // 6
```

Create a promise chain passing multiple inputs into multiple functions.

```JavaScript
fp.flow({
  input: [1,2],
  promise: [add, double]
}) // .then(6)
```

Create a promise chain passing multiple inputs into multiple functions. Override the result.

```JavaScript
fp.flow({
  input: [1,2],
  promise: [add, double],
  output: 600
}) // .then(600)
```

Create a promise chain passing multiple inputs into multiple functions. Include a catch handler.

```JavaScript
fp.flow({
  input: [1,2],
  promise: [add, double],
  error: handleError
}) // .catch(handleError)
```
