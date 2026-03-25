# Immutable State Management

A framework to provide a simple, clean way to immutably change the global state.

The global state is just a plain old javascript object (POJO). The intent is to pass the global state from function to function in order to achieve some specific set of outcomes. This supports a functional programming style of coding.

- Functions can be pure. (Immutability) Making it simple and easy to preserve the global state with no side effects reduces errors.
- Functions can be unary. (Composition) Making it simple and easy to chain functions together into a data transform pipeline.
- Functions can be focused. (Single Responsibility Principle) When the global state does need to be changed, making it simple and easy to only change one aspect per function.

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

## The `use` function

The `use` function transforms the global state as a POJO into a temporary object that mirrors the top-level properies of the global state with proxy objects.

Each proxy object has several methods that provide for accessing the value of the top-level property (e.g. `get`) and for creating a new copy of the global state with the contents of top-level value changed (e.g. `init`, `assign`, `change`, and `set`).

Each of the proxy object methods returns a new copy of the global state as a POJO.

For example, you can define the basic structure of the global state up front. However, not everything about the global state needs to defined up front. New parts can be added later.

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

## The `init` function

Create a new copy of the global state and initialize/replace the value of the top-level property.

```JavaScript
function step1 (state) {
  const { login  } = use(state);
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  return login.init({ username, password });
}

function step2 (state) {
  const { rememberMe } = use(state, 'rememberMe');
  return rememberMe.init(true)
}

const result1 = step1(state)   // {login: {username: 'johnqpublic', password: '1234'}}
const result2 = step2(result1) // {login: {username: 'johnqpublic', password: '1234'}, rememberMe: true}
```

## The `assign` function

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

const result1 = step1(state)   // {login: {username: 'johnqpublic', password: '1234'}}
const result2 = step2(result1) // {login: {username: 'johnqpublic', password: '1234', rememberMe: true}}
```

## The `set` function

Create a new copy of the global state and set a property of the value of the top-level property. The top-level property value must be an object. (Inspired by `lodash.set()`)

```JavaScript
function step1 (state) {
  const { login  } = use(state);
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  return login.init({ username, password });
}

function step2 (state) {
  const { login  } = use(state);
  return login.set('preferences.rememberMe', true );
}

const result1 = step1(state)   // {login: {username: 'johnqpublic', password: '1234'}}
const result2 = step2(result1) // {login: {username: 'johnqpublic', password: '1234'}, {preferences: {rememberMe: true}}}
```

## The `change` function

Create a new copy of the global state and make one or more changes to the value of the top-level property. In some cases, given the structure of the top-level property or other processing complexities, using `change` is more convenient than using `init`, `assign`, or `set`.

```JavaScript
function step1 (state) {
  const { login  } = use(state);
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  return login.init({ username, password });
}

function step2 (state) {
  const { login  } = use(state);
  return login.change(draft => {
    draft.username = draft.username.toUpperCase()
    draft.code = document.getElementById('code').value;
    if (!draft.preferences) {
      draft.preferences = []
    }
    draft.preferences.push({rememberMe: false})
  })
}

const result1 = step1(state)   // {login: {username: 'johnqpublic', password: '1234'}}
const result2 = step2(result1) // {login: {username: 'JOHNQPUBLIC', password: '1234', code: 'YYZ', preferences: [{rememberMe: false}]}}
```

## The `get` function

Return the entire value of the top-level property. If the value of the top-level property is an object, `get` can return just one of its properties. A default value can also be defined. (Inspired by `lodash.get()`)

```JavaScript
const { login  } = use(state);

function step1 (state) {
  const { login  } = use(state);
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  return login.init({ username, password });
}

function step2 (state) {
  const { login  } = use(state);

  login.get() // {username: 'johnqpublic', password: '1234'}
  login.get('username') // 'johnqpublic'
  login.get('password') // '1234'
  login.get('preferences.rememberMe') // undefined
  login.get('preferences.rememberMe', false) // false

  return state
}

const result1 = step1(state)   // {login: {username: 'johnqpublic', password: '1234'}}
const result2 = step1(result1) // {login: {username: 'johnqpublic', password: '1234'}}
```
