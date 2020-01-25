# power-utils

## flow

```JavaScript
function add (a , b) {
  return a + b;
}

function double (x) {
  return x * 2
}
```

```JavaScript
const power = require('power-utils');
```

Nothing happens by default.

```JavaScript
power.flow() // undefined
power.flow({}) // undefined
```

Override the result.

```JavaScript
power.flow({output: 400}) // 400
```

Pass a single input into a single function.

```JavaScript
power.flow({
  input: 2,
  now: double
 }) // 4
```

Pass a single input into a single function. Override the result.

```JavaScript
power.flow({
  input: 2,
  now: double,
  output: 400
}) // 400
```

Pass multiple inputs into a single function.

```JavaScript
power.flow({
  input: [1,2],
  now: add
}) // 3
```

Pass multiple inputs into multiple functions.

```JavaScript
power.flow({
  input: [1,2],
  now: [add, double]
}) // 6
```

Create a promise chain passing multiple inputs into multiple functions.

```JavaScript
power.flow({
  input: [1,2],
  promise: [add, double]
}) // .then(6)
```

Create a promise chain passing multiple inputs into multiple functions. Override the result.

```JavaScript
power.flow({
  input: [1,2],
  promise: [add, double],
  output: 600
}) // .then(600)
```

Create a promise chain passing multiple inputs into multiple functions. Include a catch handler.

```JavaScript
power.flow({
  input: [1,2],
  promise: [add, double],
  error: handleError
}) // .catch(handleError)
```
