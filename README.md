# Cal Sched

Convert Later.js schedule objects into recurring calendar entries, following RFC 5545.   I have written this to make it easier to use Google Calendar for scheduling of long-term repeating events, instead of setInterval() or cron, both of which have their limitations for this purpose.

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

> 

## Installation

```sh
npm install cal-sched --save
```

## Usage

```js
var calSched = require('cal-sched')

calSched() //=> "Hello World!"
```

## License

MIT license

[npm-image]: https://img.shields.io/npm/v/cal-sched.svg?style=flat
[npm-url]: https://npmjs.org/package/cal-sched
[downloads-image]: https://img.shields.io/npm/dm/cal-sched.svg?style=flat
[downloads-url]: https://npmjs.org/package/cal-sched
[travis-image]: https://img.shields.io/travis/mmorrey/cal-sched.svg?style=flat
[travis-url]: https://travis-ci.org/mmorrey/cal-sched
[coveralls-image]: https://img.shields.io/coveralls/mmorrey/cal-sched.svg?style=flat
[coveralls-url]: https://coveralls.io/r/mmorrey/cal-sched?branch=master
