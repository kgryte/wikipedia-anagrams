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

*	__resources__: may be either a `string` specifying a page title/URL or a `string array` specifying multiple page title/URLs.
* 	__clbk__: callback `function` to invoke after analyzing Wikipedia pages. The `function` should accept two arguments:
	-	__error__: `error` object. If no errors occur during analysis, this value is `null`.
	-	__hashes__: `array` of [anagram hashes](https://github.com/compute-io/anagram-hash).

``` javascript
// Single resource:
getAnagrams( 'President of the United States', onAnagrams );

// Multiple resources:
getAnagrams( [
	'http://en.wikipedia.org/wiki/ballet',
	'http://es.wikipedia.org/wiki/ballet'
], onAnagrams );

function onAnagrams( error, hashes ) {
	if ( error ) {
		console.error( error );
		return;
	}
	console.log( hashes );
}
```

The function accepts the following `options`:

*	__lang__: the default page language. Default: `'en'`.

To specify an alternative default language, set the `lang` option.

``` javascript
getAnagrams( 'ballet', {'lang':'es'}, onAnagrams );
// => fetches the Spanish Wikipedia resource for ballet
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
	hash = hashes[ 0 ].copy();
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


---
## CLI


### Installation

To use the module as a general utility, install the module globally

``` bash
$ npm install -g wikipedia-anagrams
```


### Usage

``` bash
Usage: wikipedia-anagrams [options] [url 1] [url 2] [url 3] ...

Options:

  -h,    --help                Print this message.
  -V,    --version             Print the package version.
  -enc,  --encoding <encoding> Set the string encoding of chunks. Default: null.
  -hwm,  --highwatermark       Specify how much data can be buffered into memory
                               before applying back pressure. Default: 16kb.
  -nho,  --no-halfopen         Close the stream when the writable stream ends.
                               Default: false.
  -nds,  --no-decodestrings    Prevent strings from being converted into buffers
                               before streaming to destination. Default: false.
  -om,   --objectmode          Stream individual objects rather than buffers.
                               Default: false.
  -lang, --language <lang>     Set the default query language. Default: 'en'.
```

The `wikipedia-anagrams` command is available as a [standard stream](http://en.wikipedia.org/wiki/Pipeline_%28Unix%29).

``` bash
$ <stdout> | wikipedia-anagrams | <stdin>
``` 


### Examples

``` bash
# Specify a single page title:
$ wikipedia-anagrams mathematics

# Specify the default language:
$ wikipedia-anagrams --lang=es ballet

# Specify multiple page titles:
$ wikipedia-anagrams mathematics ballet

# Specify a single page URL:
$ wikipedia-anagrams 'http://en.wikipedia.org/wiki/mathematics'

# Specify multiple page URLs:
$ wikipedia-anagrams 'http://en.wikipedia.org/wiki/mathematics' 'http://en.wikipedia/org/wiki/ballet'

# Specify both page titles and page URLs:
$ wikipedia-anagrams 'http://en.wikipedia.org/wiki/mathematics' ballet

# Pipe Wikipedia page markup:
$ curl -s 'http://en.wikipedia.org/w/index.php?action=raw&title=mathematics' | wikipedia-anagrams | awk '{print "\nAnagrams:\n\n"$1}'

# Pipe multiple Wikipedia pages:
$ curl -s 'http://en.wikipedia.org/w/index.php?action=raw&title=mathematics' 'http://en.wikipedia.org/w/index.php?action=raw&title=ballet' | wikipedia-anagrams | awk '{print "\nAnagrams:\n\n"$1}'
```

For local installations, modify the command to point to the local installation directory; e.g., 

``` bash
$ ./node_modules/.bin/wikipedia-anagrams  mathematics
```

Or, if you have cloned this repository and run `npm install`, modify the command to point to the executable; e.g., 

``` bash
$ node ./bin/cli mathematics
```


---
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
