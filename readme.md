# nanosignal
a stripped-back, 340-byte [signalhub](https://github.com/mafintosh/signalhub) client

## install
```sh
npm install michaelrhodes/nanosignal#1.0.0
```

## use
```js
var signal = require('nanosignal')
var you = signal('https://{signalhub}/v1/{app}/{channel}')
var them = signal('https://{signalhub}/v1/{app}/{channel}')

setTimeout(function () {
  you.send('offer')

  them.onmessage = function (msg) {
    console.assert(msg === 'offer')
    them.send('answer')
    them.close()
  }

  you.onmessage = function (msg) {
    console.assert(msg === 'answer')
    you.close()
  }
})
```

## obey
Copyright 2019 Michael Rhodes

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
