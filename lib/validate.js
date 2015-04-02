/**
*
*	VALIDATE: options
*
*
*	DESCRIPTION:
*		- Validates transform stream options.
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

var isString = require( 'validate.io-string' ),
	isObject = require( 'validate.io-object' ),
	isBoolean = require( 'validate.io-boolean' ),
	isNonNegative = require( 'validate.io-nonnegative' );


// VARIABLES //

var validators = {
	'encoding': encoding,
	'allowHalfOpen': allowHalfOpen,
	'highWaterMark': highWaterMark,
	'objectMode': objectMode,
	'decodeStrings': decodeStrings
};


// FUNCTIONS //

/**
* FUNCTION: validate( options )
*	Validates stream options.
*
* @private
* @param {Object} options - Readable stream options
* @returns {Null|TypeError} null if valid or TypeError if invalid
*/
function validate( options ) {
	var validator,
		keys,
		key,
		err;

	if ( !isObject( options ) ) {
		return new TypeError( 'wikipedia-anagrams::invalid input argument. Options must be an object. Value: `' + options + '`.' );
	}
	keys = Object.keys( options );
	for ( var i = 0; i < keys.length; i++ ) {
		key = keys[ i ];
		validator = validators[ key ];
		err = validator( options[key] );
		if ( err ) {
			return err;
		}
	}
} // end FUNCTION validate()

/**
* FUNCTION: encoding( value )
*	Validates the stream encoding option.
*
* @private
* @param {String|Null} value - stream encoding
* @return {Null|TypeError} null if valid or TypeError if invalid
*/
function encoding( value ) {
	if ( !isString( value ) && value !== null ) {
		return new TypeError( 'wikipedia-anagrams::invalid option. Encoding option must be a string or null. Option: `' + value + '`.' );
	}
	return null;
} // end FUNCTION encoding()

/**
* FUNCTION: allowHalfOpen( value )
*	Validates the stream `allowHalfOpen` option.
*
* @private
* @param {String} value - stream option value
* @return {Null|TypeError} null if valid or TypeError if invalid
*/
function allowHalfOpen( value ) {
	if ( !isBoolean( value ) ) {
		return new TypeError( 'wikipedia-anagrams::invalid option. allowHalfOpen option must be a boolean. Option: `' + value + '`.' );
	}
	return null;
} // end FUNCTION allowHalfOpen()

/**
* FUNCTION: highWaterMark( value )
*	Validates the stream high watermark option.
*
* @private
* @param {Number} value - stream high watermark
* @return {Null|TypeError} null if valid or TypeError if invalid
*/
function highWaterMark( value ) {
	if ( !isNonNegative( value ) ) {
		return new TypeError( 'wikipedia-anagrams::invalid option. High watermark option must be a nonnegative number. Option: `' + value + '`.' );
	}
	return null;
} // end FUNCTION highWaterMark()

/**
* FUNCTION: objectMode( value )
*	Validates the stream objectMode option.
*
* @private
* @param {Boolean} value - stream objectMode option
* @return {Null|TypeError} null if valid or TypeError if invalid
*/
function objectMode( value ) {
	if ( !isBoolean( value ) ) {
		return new TypeError( 'wikipedia-anagrams::invalid option. objectMode option must be a boolean. Option: `' + value + '`.' );
	}
	return null;
} // end FUNCTION objectMode()

/**
* FUNCTION: decodeStrings( value )
*	Validates the stream decodeStrings option.
*
* @private
* @param {String} value - decodeStrings option
* @return {Null|TypeError} null if valid or TypeError if invalid
*/
function decodeStrings( value ) {
	if ( !isBoolean( value ) ) {
		return new TypeError( 'wikipedia-anagrams::invalid option. decodeStrings option must be a boolean. Option: `' + value + '`.' );
	}
	return null;
} // end FUNCTION decodeStrings()


// EXPORTS //

module.exports = validate;
