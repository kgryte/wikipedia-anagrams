/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	preprocess = require( './../lib/preprocess.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'preprocess', function tests() {

	var text = 'Beep 123 --++ Boop';

	it( 'should export a function', function test() {
		expect( preprocess ).to.be.a( 'function' );
	});

	it( 'should return an array of tokens', function test() {
		expect( preprocess( text ) ).to.be.an( 'array' );
	});

	it( 'should preprocess text data to only contain lowercase alpha and whitespace characters', function test() {
		var actual, expected;

		actual = preprocess( text );
		expected = ['beep','boop'];

		assert.deepEqual( actual, expected );
	});

});
