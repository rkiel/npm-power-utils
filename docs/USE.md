## use

State management

```JavaScript
const state = {
  user: { id: 2112, first: 'Sarah', middle: 'Jane', last: 'Smith' },
  cart: { items: [
    {id: 123, qty: 2},
    {id: 456, qty: 1}
  ]}
}
```

### set

```JavaScript
const { use } = require('power-utils');

function something(state) {
  const { user } = use(state)
  return user.set('email', 'sjs@foo.bar')
}
```

```JavaScript
function something(state) {
  const { user } = use(state)
  return user.set({email: 'sjs@foo.bar', 'social.twitter': '@theRealSjs'})
}
```

### get

```JavaScript
const { use } = require('power-utils');

function fullName(state) {
  const { user } = use(state)
  return [user.get('first'), user.get('middle', 'N/A'), user.get('last')].join(' ');
}
```

### init

```JavaScript
const { use } = require('power-utils');

function something(state) {
  const { user } = use(state)
  return user.init({ id: 3223, first: 'John', middle: 'Q', last: 'Public' });
}

function something(state) {
  const { cart } = use(state)
  return cart.init({ items: [] });
}
```

### assign

```JavaScript
const { use } = require('power-utils');

function something(state) {
  const { user } = use(state)
  return user.assign({email: 'sjs@foo.bar'})
}
```
