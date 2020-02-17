## get

```JavaScript
const user = {first: 'Sarah', last: 'Smith', social: {twitter: '@theRealSjs'}}

const { im } = require('power-utils');

im.get(user, 'first') // Sarah
im.get(user, 'middle', 'N/A') // N/A
im.get(user, 'social.twitter') // @theRealSjs
im.get(user, 'email.work') // undefined
```
