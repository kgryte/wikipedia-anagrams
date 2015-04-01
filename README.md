Wikipedia Anagrams
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Finds anagrams in [Wikipedia](http://www.wikipedia.org/) pages.


## Installation

``` bash
$ npm install wikipedia-anagrams
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var getAnagrams = require( 'wikipedia-anagrams' );
```

#### getAnagrams( x )

Finds anagrams in [Wikipedia](http://www.wikipedia.org/) pages.

``` javascript

```



## Examples

``` javascript
var getAnagrams = require( 'wikipedia-anagrams' );

```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT). 


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/wikipedia-anagrams.svg
[npm-url]: https://npmjs.org/package/wikipedia-anagrams

[travis-image]: http://img.shields.io/travis/kgryte/wikipedia-anagrams/master.svg
[travis-url]: https://travis-ci.org/kgryte/wikipedia-anagrams

[coveralls-image]: https://img.shields.io/coveralls/kgryte/wikipedia-anagrams/master.svg
[coveralls-url]: https://coveralls.io/r/kgryte/wikipedia-anagrams?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/wikipedia-anagrams.svg
[dependencies-url]: https://david-dm.org/kgryte/wikipedia-anagrams

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/wikipedia-anagrams.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/wikipedia-anagrams

[github-issues-image]: http://img.shields.io/github/issues/kgryte/wikipedia-anagrams.svg
[github-issues-url]: https://github.com/kgryte/wikipedia-anagrams/issues
