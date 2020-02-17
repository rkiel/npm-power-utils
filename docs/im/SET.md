## set

```JavaScript
const user = {first: 'Sarah', last: 'Smith', social: {twitter: '@theRealSjs'}}

const { im } = require('power-utils');

im.set(user, 'first', 'Sara')
// {first: 'Sara', last: 'Smith', social: {twitter: '@theRealSjs'}}

im.set(user, 'email.work', 'sjs@work.com')
// {first: 'Sarah', last: 'Smith', {email: {work: 'sjs@work.com'}}, social: {twitter: '@theRealSjs'}}
```
