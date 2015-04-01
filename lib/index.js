/**
*
*	WIKIPEDIA ANAGRAMS
*
*
*	DESCRIPTION:
*		- Finds anagrams in Wikipedia pages.
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
	isArray = require( 'validate.io-array' ),
	isObject = require( 'validate.io-object' ),
	isFunction = require( 'validate.io-function' ),
	wikipedia = require( 'wtf_wikipedia' ),
	createHash = require( 'compute-anagram-hash' ),
	preprocess = require( './preprocess.js' );


// FUNCTIONS //

/**
* FUNCTION: isURL( str )
*	Sniffs is a string is a web URL.
*
* @private
* @param {String} str - string to sniff
* @returns {Boolean} boolean indicating if a string is a web URL
*/
function isURL( str ) {
	return (/^http|^https/).test( str );
} // end FUNCTION isURL()

/**
* FUNCTION: getPageName( page )
*	Extract a page name from a Wikipedia URL.
*
* @private
* @param {String} page - Wikipedia URL
* @returns {String} page name
*/
function getPageName( page ) {
	page = page.split( '/' );
	page = page[ page.length-1 ];
	page = page.split( /\#|\?/ );
	return page[ 0 ];
} // end FUNCTION getPageName()

/**
* FUNCTION: onPage( idx, next )
*	Wraps a page index and a callback within a closure and returns a callback to be invoked once the page is loaded.
*
* @private
* @param {Number} idx - page index
* @param {Function} next - callback to invoke after processing a page's mark-up
* @returns {Function} callback
*/
function onPage( idx, next ) {
	/**
	* FUNCTION: onPage( markup )
	*	Callback invoked once a page is loaded from Wikipedia. Converts the page markup to plain text, sanitizes and tokenizes the text, and then creates an anagram hash from the text content.
	*
	* @private
	* @param {String} markup - page markup
	*/
	return function onPage( markup ) {
		// TODO: onPage should have an error argument as its first argument. Requires custom fetch method.
		var text = wikipedia.plaintext( markup );
		text = preprocess( text );
		next( null, createHash( text ), idx );
	}; // end FUNCTION onPage()
} // end FUNCTION onPage()


// WIKIPEDIA ANAGRAMS //

/**
* FUNCTION: getAnagrams( pages, [opts,] clbk )
*	Finds anagrams in Wikipedia pages.
*
* @param {String|String[]} pages - Wikipedia page name(s) in which to find anagrams
* @param {Object} [opts] - function options
* @param {Function} clbk - callback to invoke after analyzing Wikipedia page(s)
*/
function getAnagrams( pages, opts, clbk ) {
	var nargs = arguments.length,
		isStr = isString( pages ),
		hashes,
		count,
		done,
		name,
		pgs,
		len,
		i;
	if ( !isStr && !isArray( pages ) ) {
		throw new TypeError( 'getAnagrams()::invalid input argument. Must provide either a string or a string array. Value: `' + pages + '`.' );
	}
	if ( nargs > 2 ) {
		done = clbk;
		if ( !isObject( opts ) ) {
			throw new TypeError( 'getAnagrams()::invalid input argument. Options must be an object. Value: `' + opts + '`.' );
		}
	} else {
		done = opts;
	}
	if ( !isFunction( done ) ) {
		throw new TypeError( 'getAnagrams()::invalid input argument. Callback argument must be a function. Value: `' + done + '`.' );
	}
	if ( isStr ) {
		pgs = [ pages ];
	} else {
		pgs = pages;
	}
	len = pgs.length;
	hashes = new Array( len );
	count = 0;
	for ( i = 0; i < len; i++ ) {
		name = pgs[ i ];
		if ( isURL( name ) ) {
			name = getPageName( name );
		}
		wikipedia.from_api( name, 'en', onPage( i, next ) );
	}
	return;

	/**
	* FUNCTION: next( error, hash, i )
	*	Callback invoked after a page has been processed.
	*
	* @private
	* @param {Object|null} error - error object
	* @param {Object} hash - anagram hash
	* @param {Number} i - page index
	*/
	function next( error, hash, i ) {
		if ( error ) {
			done( error );
			return;
		}
		hashes[ i ] = hash;
		if ( ++count === len ) {
			done( null, hashes );
		}
	} // end FUNCTION next()
} // end FUNCTION getAnagrams()


// EXPORTS //

module.exports = getAnagrams;
