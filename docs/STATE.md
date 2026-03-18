## use

Immutable State Management

Start with an empty state. Just a plain on old JavaScript object.

```JavaScript
const { use } = require('power-utils').state;

async function onButtonClick() {
  const state = { }
  const run = pipe(getCredentials, authenticate, loadTasks)
  return await run(state)
}

function getCredentials(state) {
  // add login to state if it does not exist
  const { login } = use(state, "login");

  const userId = document.getElementById('userId').value;
  const password = document.getElementById('password').value;

  // return new state with login initialized to be an object
  return login.init({ userId, password });
}

async function authenticate(state) {
   // add jwt to state if it does not exist
   // assume that login has already been added to state
  const { jwt, login } = use(state, 'jwt');

  // get two properties from the login object
  const result = await myapi.authenticate(login.get('userId'), login.get('password'));

  // return new state with jwt initialized
  return jwt.init(result);
}

async function loadTasks(state) {
  // add tasks to state if it does not exit
  // assume that jwt has already been added to state
  const { jwt, tasks } = use(state, 'tasks');

  // get the whole contents of jwt
  const array = await myapi.getTasks(jwt.get());

  // return new state with tasks initialized to be an array
  return tasks.init(result);
}
```

```JavaScript
const state = {
  form: {
    userId: sarah2112,
    password: '1234'
  },
  user: { first: 'Sarah', middle: 'Jane', last: 'Smith' },
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
