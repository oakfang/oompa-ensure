# oompa-ensure
An Oompa middleware to ensure payload keys

## Usage
```js
const Oompa = require('oompa');
const tokenize = require('oompa-token');
const ensure = require('oompa-ensure');
const schema = require('./schema');

const SECRET = 'foobar';

const server = new Oompa(schema);
server.use(ensure('GET_INFO', 'token'));
server.use(ensure('SET_INFO', 'token'));
server.use(tokenize(SECRET, 'LOGIN'));

server.listen(9000);
```

## Why?
To make sure a certain task has all of its required payload properties.

### `require('oompa-ensure')(type:String, ...keys:[String])`
- **type** is the task type you wish to ensure the presence if certain keys for.
- **keys** is the list of keys you wish to ensure are in the task's payload.

### Side Effects
The request does not change in any way, but if an ensured key is missing, the request is reject early.