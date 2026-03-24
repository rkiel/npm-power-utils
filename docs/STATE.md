# Immutable State Management

A framework to provide a simple, clean way to immutably change the global state.

Here's an example of it in action.

```JavaScript
const { use } = require('power-utils').state;

// fictitious button onClick handler
// start with an empty state (plain old javascript object)
// STEP 1 - grab credentails from login form data
// STEP 2 - authenticate via back-end api (unauthenticated)
// STEP 3 - retrieve tasks from back-end api (authenticated)
async function onButtonClick() {
  const state = { }
  const run = pipe(getCredentials, authenticate, loadTasks)
  return await run(state)
}

// STEP 1 - grab credentails from login form data
function getCredentials(state) {
  // add login to state if it does not exist
  const { login } = use(state, 'login');

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // return new state with login initialized to be an object
  return login.init({ username, password });
}

// STEP 2 - authenticate via back-end api (unauthenticated)
async function authenticate(state) {
   // add jwt to state if it does not exist
   // assume that login has already been added to state
  const { jwt, login } = use(state, 'jwt');

  // get the whole contents of jwt
  const token = jwt.get();
  // if it is empty (i.e. we have not authenticated)
  if (Object.keys(token).length === 0) {
    // get two properties from the login object
    const result = await myapi.authenticate(login.get('username'), login.get('password'));

    // return new state with jwt initialized
    return jwt.init(result);
  } else {
    // we have previously authenticated
    // return state unchanged
    return state;
  }
}

// STEP 3 - retrieve tasks from back-end api (authenticated)
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

## use

The `use` function transforms a POJO into a temporary object that mirrors top-level properies of the POJO with proxy objects.

Each proxy object has several methods that provide for accessing the value of the top-level property (e.g. `get`) and for creating a new copy of the entire state with the contents of top-level value changed (e.g. `init`, `assign`, `change`, and `set`).

Each of the proxy object methods returns a new copy of the entire state as a POJO.

For example, you can define the basic structure of the global state up front. Not everything about the global state needs to defined up front. New parts can be added.

```JavaScript
const darkMode = "auto"
const login = {}
const jwt = {}
const tasks = []
const state = { darkMode, login, jwt, tasks }
```

Use the simple, clean JavaScript destructuring syntax to access one or more of the proxy objects.

```JavaScript
function example1 (state) {
  const { login  } = use(state);
}

function example2 (state) {
  const { darkMode, login, jwt, tasks } = use(state);
}
```

For cases when one or more top-level properites are not already defined, you can create them. If the top-level property already exists, it will be used. Otherwise, it will create a proxy object for an empty object. (You can set its value to something other than an object.)

```JavaScript
function example3 (state) {
  const { one } = use(state, 'one');
}

function exmple4 (state) {
  const { one, two, three } = use(state, 'one', 'two', 'three');
}

function example5 (state) {
  const { login, one } = use(state, 'one');
}

function example6 (state) {
  const { login, one } = use(state, 'login', 'one');
}
```

### init

Create a new copy of the global state and initialize/replace the value of the top-level property.

```JavaScript
function example1 (state) {
  const { login  } = use(state);
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  return login.init({ username, password });
}

function example2 (state) {
  const { rememberMe } = use(state, 'rememberMe');
  return rememberMe.init(true)
}
```

### assign

Create a new copy of the global state and merge with the value of the top-level property. The top-level property must be an object. (Inspired by `Object.assign()`)

```JavaScript
function step1 (state) {
  const { login  } = use(state);
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  return login.init({ username, password });
}

function step2 (state) {
  const { login  } = use(state);
  return login.assign({ rememberMe: true });
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
