/* global require, describe, it, beforeEach */
'use strict';

var mpath = './../lib';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Filesystem module:
	fs = require( 'fs' ),

	// Path module:
	path = require( 'path' ),

	// Module to proxy dependencies:
	proxyquire = require( 'proxyquire' ),

	// Module to be tested:
	getAnagrams = require( mpath );


// FIXTURES //

var markup, text;

markup = fs.readFileSync( path.resolve( __dirname, 'fixtures/markup.md' ), 'utf8' );

text = fs.readFileSync( path.resolve( __dirname, 'fixtures/text.txt' ), 'utf8' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'wikipedia-anagrams', function tests() {

	// SETUP //

	var wikipedia;

	beforeEach( function before() {
		wikipedia = {
			from_api: function( page, lang, clbk ) {
				clbk( markup );
			},
			plaintext: function() {
				return text;
			}
		};
	});


	// TESTS //

	it( 'should export a function', function test() {
		expect( getAnagrams ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a string or string array', function test() {
		var values = [
			5,
			null,
			undefined,
			NaN,
			true,
			[],
			{},
			function(){},
			['a',null],
			['a','b',5]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				getAnagrams( value, function(){} );
			};
		}
	});

	it( 'should throw an error if not provided a callback function', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			true,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				getAnagrams( ['a'], value );
			};
		}
	});

	it( 'should throw an error if not provided an options argument which is not an object', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			true,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				getAnagrams( ['a'], value, function(){} );
			};
		}
	});

	it( 'should throw an error if not provided a `lang` option which is not a string', function test() {
		var values = [
			function(){},
			5,
			null,
			undefined,
			NaN,
			true,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				getAnagrams( ['a'], {
					'lang': value
				}, function(){} );
			};
		}
	});

	it( 'should find anagrams in a single resource', function test( done ) {
		var getAnagrams = proxyquire( mpath, {
			'wtf_wikipedia': wikipedia
		});

		getAnagrams( 'beep', onAnagrams );

		function onAnagrams( error, hashes ) {
			var actual, expected, list;

			list = hashes[ 0 ].get();
			assert.strictEqual( list.length, 3 );

			actual = hashes[ 0 ].get( 'dog' );
			expected = ['god'];

			assert.deepEqual( actual, expected );

			done();
		}
	});

	it( 'should find anagrams in multiple resources', function test( done ) {
		var getAnagrams = proxyquire( mpath, {
			'wtf_wikipedia': wikipedia
		});

		getAnagrams( ['beep','http://en.wikipedia.org/wiki/boop'], {}, onAnagrams );

		function onAnagrams( error, hashes ) {
			var actual, expected, list;

			list = hashes[ 0 ].get();
			assert.strictEqual( list.length, 3 );

			actual = hashes[ 0 ].get( 'dog' );
			expected = ['god'];

			assert.deepEqual( actual, expected );

			done();
		}
	});

	it( 'should allow the default language to be specified', function test( done ) {
		var getAnagrams = proxyquire( mpath, {
			'wtf_wikipedia': wikipedia
		});

		getAnagrams( 'http://en.wikipedia.org/wiki/beep', {'lang':'es'}, onAnagrams );

		function onAnagrams( error, hashes ) {
			var actual, expected, list;

			list = hashes[ 0 ].get();
			assert.strictEqual( list.length, 3 );

			actual = hashes[ 0 ].get( 'dog' );
			expected = ['god'];

			assert.deepEqual( actual, expected );

			done();
		}
	});

	it( 'should return an error if an error is encountered during analysis' );

});
