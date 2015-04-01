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
	url = require( 'url' ),
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
* FUNCTION: onResource( idx, next )
*	Wraps a resource index and a callback within a closure and returns a callback to be invoked once the resource is loaded.
*
* @private
* @param {Number} idx - resource index
* @param {Function} next - callback to invoke after processing a resource's mark-up
* @returns {Function} callback
*/
function onResource( idx, next ) {
	/**
	* FUNCTION: onResource( markup )
	*	Callback invoked once a resource is loaded from Wikipedia. Converts the resource markup to plain text, sanitizes and tokenizes the text, and then creates an anagram hash from the text content.
	*
	* @private
	* @param {String} markup - resource markup
	*/
	return function onResource( markup ) {
		// TODO: onResource should have an error argument as its first argument. Requires custom fetch method.
		var text = wikipedia.plaintext( markup );
		text = preprocess( text );
		next( null, createHash( text ), idx );
	}; // end FUNCTION onResource()
} // end FUNCTION onResource()


// WIKIPEDIA ANAGRAMS //

/**
* FUNCTION: getAnagrams( resources, [opts,] clbk )
*	Finds anagrams in Wikipedia pages.
*
* @param {String|String[]} resources - Wikipedia page title(s) or URL(s) in which to find anagrams
* @param {Object} [opts] - function options
* @param {String} [opts.lang='en'] - Wikipedia language
* @param {Function} clbk - callback to invoke after analyzing Wikipedia page(s)
*/
function getAnagrams( resources, opts, clbk ) {
	var nargs = arguments.length,
		isStr = isString( resources ),
		hashes,
		count,
		parts,
		lang,
		done,
		rsrc,
		str,
		len,
		i;
	if ( !isStr && !isArray( resources ) ) {
		throw new TypeError( 'getAnagrams()::invalid input argument. Must provide either a string or a string array. Value: `' + resources + '`.' );
	}
	if ( nargs > 2 ) {
		done = clbk;
		if ( !isObject( opts ) ) {
			throw new TypeError( 'getAnagrams()::invalid input argument. Options must be an object. Value: `' + opts + '`.' );
		}
		if ( opts.hasOwnProperty( 'lang' ) ) {
			if ( !isString( opts.lang ) ) {
				throw new TypeError( 'getAnagrams()::invalid option. Language option must be a string. Option: `' + opts.lang + '`.' );
			}
		}
	} else {
		done = opts;
	}
	if ( !isFunction( done ) ) {
		throw new TypeError( 'getAnagrams()::invalid input argument. Callback argument must be a function. Value: `' + done + '`.' );
	}
	if ( isStr ) {
		rsrc = [ resources ];
	} else {
		rsrc = resources;
	}
	len = rsrc.length;
	hashes = new Array( len );
	count = 0;
	for ( i = 0; i < len; i++ ) {
		lang = opts.lang || 'en';
		str = rsrc[ i ];
		if ( isURL( str ) ) {
			parts = url.parse( str );
			lang = parts.hostname.split( '.' )[ 0 ];
			parts = parts.pathname.split( '/' );
			str = parts[ parts.length-1 ];
		}
		wikipedia.from_api( str, lang, onResource( i, next ) );
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
