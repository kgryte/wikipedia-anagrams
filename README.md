Wikipedia Anagrams
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Finds [anagrams](http://en.wikipedia.org/wiki/Anagram) in [Wikipedia](http://www.wikipedia.org/) pages.


## Installation

``` bash
$ npm install wikipedia-anagrams
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var getAnagrams = require( 'wikipedia-anagrams' );
```

#### getAnagrams( resources, [opts,] clbk )

Finds [anagrams](http://en.wikipedia.org/wiki/Anagram) in [Wikipedia](http://www.wikipedia.org/) pages. The function requires two arguments:

*	__resources__: can be either a `string` specifying a page title/URL or a `string array` specifying multiple page title/URLs.
* 	__clbk__: callback `function` to invoke after analyzing Wikipedia pages. The `function` should accept two arguments:
	-	__error__: `error` object.
	-	__hashes__: `array` of [anagram hashes](https://github.com/compute-io/anagram-hash).

``` javascript
function onAnagrams( error, hashes ) {
	if ( error ) {
		console.error( error );
		return;
	}
	console.log( hashes );
}

// Single resource:
getAnagrams( 'President of the United States', onAnagrams );

// Multiple resources:
getAnagrams( ['http://en.wikipedia.org/wiki/ballet', 'http://es.wikipedia.org/wiki/ballet'], onAnagrams );
```

The function accepts the following `options`:

*	__lang__: the default page language. Default: 'en'.

To specify an alternative default language, set the `lang` option.

``` javascript
getAnagrams( 'ballet', {'lang':'es'}, onAnagrams );
```

__Note__: if provided a URL, the language indicated by the URL supersedes the default `lang` option.

``` javascript
getAnagrams( 'http://en.wikipedia.org/wiki/ballet', {'lang':'es'}, onAnagrams );
// => fetches the 'en' ballet resource, not the 'es' resource
```



## Examples

``` javascript
var getAnagrams = require( 'wikipedia-anagrams' );

// Specify Wikipedia resources either by page title or by URL...
var resources = [
	'Linear regression',
	'http://en.wikipedia.org/wiki/ballet',
	'http://es.wikipedia.org/wiki/ballet',
	'Spain',
	'President of the United States',
	'Mathematics'
];

// Run the analysis...
getAnagrams( resources, onAnagrams );

// Callback invoked after running the anagram analysis...
function onAnagrams( error, hashes ) {
	var hash,
		len,
		i;

	if ( error ) {
		throw new Error( error );
	}
	// Print the individual results...
	len = hashes.length;
	for ( i = 0; i < len; i++ ) {
		console.log( resources[ i ] + '...' );
		console.log( hashes[ i ].get() );
		console.log( '\n' );
	}
	// Merge the hashes...
	hash = hashes[ 0 ];
	hash.merge.apply( hash, hashes.slice( 1 ) );

	// Print the merged hash...
	console.log( 'Merged...' );
	console.log( hash.get() );
}
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
