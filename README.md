# frequency-counter

Count the number of occurrences of a repeating event per unit of time.

[![Build status](https://travis-ci.org/watson/frequency-counter.svg?branch=master)](https://travis-ci.org/watson/frequency-counter)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Installation

```
npm install frequency-counter --save
```

## Usage example

Example HTTP server responding with the number of requests per minute (rpm):

```js
const http = require('http')
const Freq = require('frequency-counter')

// if no arguments are given a window of one minute is used
const counter = new Freq()

const server = http.createServer(function (req, res) {
  // increment the count
  counter.inc()
 
  // return current frequency to client
  res.end('rpm: ' + counter.freq() + '\n')
})

server.listen(3000)
```

## API

### `counter = new Freq([windowSize])`

Initialize the frequency counter. Optionally set a custom window size in
seconds over which the frequency should be calcuated (default: `60`).

### `counter.inc([amount])`

Track an occurrence by incrementing a counter. Optionally provide the
`amount` to increment by (default: `1`).

### `number = counter.freq()`

Calculate and return the current frequency.

## License

MIT
