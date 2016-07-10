Synchronisify
=============
Turns asynchronous constructor into synchronous one.
```
npm install synchronisify
```

Why?
----
Often we want to do asynchronous action directly in constructor of a object:
```
class DatabaseClient {
    constructor(connectionString) {
        // connect to database
        // what should we return here?
    }
}
```
the problem is that if we return here a promise usage of our object will be... weird:

```new DatabaseClient('me@localhost/myDatabase').then((db) => {/* do something */})```

What we can do is to make async action 'in background' and make sure in each method of a class waits for initialization to finish. This is exactly was `synchronisify` makes easier.

There are also different options like static method, read [this](http://stackoverflow.com/questions/24398699/is-it-bad-practice-to-have-a-constructor-function-return-a-promise) StackOverflow thread for more.

Example
-------
`synchronisify` helps programmers to build clean public interface.

```
const synchronisify = require('../lib/lib')

const delay = (t = 1000) => new Promise(resolve => setTimeout(resolve, t))
class ApiClient {
  constructor (login, pass) {
    this.login = login
    this.pass = pass
    // simulate api call for auth key
    this._init = delay().then(() => { this.apiKey = 'SECRET_API_KEY' })
  }

  action () {
    if (!this.apiKey) {
      throw new Error()
    }

    // do something
  }
}

synchronisify(ApiClient) // by default _init is the name of promise that indicates initialization

const client = new ApiClient('login', 'pass') // constructor itself is synchroneus
client.action() // action method code will run after init is done
```

How?
----
Each method in prototype is wrapped in `initPromise.then(method)`. Drawback is that each method becames async i.e. it returns promise.

Docs
---
`function synchronisify (asyncClass, initPromiseName = '_init')`
