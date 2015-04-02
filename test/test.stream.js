/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Filesystem module:
	fs = require( 'fs' ),

	// Path module:
	path = require( 'path' ),

	// Transform stream class:
	Transform = require( 'readable-stream' ).Transform,

	// Mock writing to a stream:
	mockWrite = require( 'flow-mock-write' ),

	// Mock reading from a stream:
	mockRead = require( 'flow-mock-read' ),

	// Module to be tested:
	stream = require( './../lib/stream.js' );


// FIXTURES //

var markup = fs.readFileSync( path.resolve( __dirname, 'fixtures/markup.md' ), 'utf8' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'stream', function tests() {

	it( 'should export a function', function test() {
		expect( stream ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a bad option', function test() {
		expect( badOption ).to.throw( TypeError );

		function badOption() {
			stream({ 'objectMode': [] });
		}
	});

	it( 'should return a transform stream', function test() {
		var opts = {
				'encoding': 'utf8',
				'objectMode': true,
				'highWaterMark': 16,
				'allowHalfOpen': true,
				'decodeStrings': false
			};
		assert.instanceOf( stream( opts ), Transform );
	});

	it( 'should find anagrams in streamed markup', function test( done ) {
		var s = stream();

		mockRead( s, onData );
		mockWrite( [ markup ], s );

		function onData( error, actual ) {
			var expected;
			if ( error ) {
				assert.notOk( true );
				return;
			}
			actual = JSON.parse( actual );
			assert.strictEqual( actual.length, 3 );

			expected = [
				[ 'dog', 'god' ],
				[ 'bat', 'tab' ],
				[ 'rat', 'tar' ]
			];
			assert.deepEqual( actual, expected );
			done();
		}
	});

});
