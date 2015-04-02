/**
*
*	STREAM: wikipedia-anagrams
*
*
*	DESCRIPTION:
*		- Transform stream which extracts anagrams from Wikipedia markup.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2015.
*
*/

'use strict';

// MODULES //

var Transform = require( 'readable-stream' ).Transform,
	wikipedia = require( 'wtf_wikipedia' ),
	createHash = require( 'compute-anagram-hash' ),
	validate = require( './validate.js' ),
	preprocess = require( './preprocess.js' );


// STREAM //

/**
* FUNCTION: Stream( [options] )
*	Transform stream constructor.
*
* @constructor
* @param {Object} [options] - Transform stream options
* @returns {Stream} Transform stream
*/
function Stream( options ) {
	var args = arguments,
		opts = {},
		err;
	if ( args.length ) {
		opts = options;
	}
	if ( !( this instanceof Stream ) ) {
		return new Stream( opts );
	}
	err = validate( opts );
	if ( err ) {
		throw err;
	}
	Transform.call( this, opts );
	this._readableState.objectMode = true;
	this._data = '';

	return this;
} // end FUNCTION Stream()

/**
* Create a prototype which inherits from the parent prototype.
*/
Stream.prototype = Object.create( Transform.prototype );

/**
* Set the constructor.
*/
Stream.prototype.constructor = Stream;

/**
* METHOD: _transform( chunk, encoding, clbk )
*	Implements the `_transform` method to accept input and produce output.
*
* @private
* @param {Buffer|String} chunk - the chunk to be transformed
* @param {String} encoding - chunk encoding
* @param {Function} clbk - callback invoked after transforming a chunk
*/
Stream.prototype._transform = function( chunk, encoding, clbk ) {
	this._data += wikipedia.plaintext( chunk.toString() );
	clbk();
}; // end METHOD _transform()

/**
* METHOD: _flush( clbk )
*	Implements the `_flush` method to handle any remaining data.
*
* @private
* @param {Function} clbk - callback to invoke after handling remaining data
*/
Stream.prototype._flush = function( clbk ) {
	var hash = createHash( preprocess( this._data ) );
	this.push( JSON.stringify( hash.get() ) );
	clbk();
}; // end METHOD _flush()


// EXPORTS //

module.exports = Stream;
