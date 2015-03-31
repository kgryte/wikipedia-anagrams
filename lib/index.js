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
	wikipedia = require( 'wtf_wikipedia' );


// FUNCTIONS //

/**
* FUNCTION: ascending( a, b )
*	Comparator function for sorting characters in ascending order.
*
* @private
* @param {String} a - character
* @param {String} b - character
* @returns {Number} comparison value
*/
function ascending( a, b ) {
	if ( a < b ) {
		return -1;
	}
	if ( a === b ) {
		return 0;
	}
	return 1;
} // end FUNCTION ascending()

/**
* FUNCTION: contains( arr, str )
*	Validates if an array contains a specified string.
*
* @param {String[]} arr - input array
* @param {String} str - input string
* @returns {Boolean} boolean indicating if the input array contains the specified string
*/
function contains( arr, str ) {
	var len = arr.length,
		i;
	for ( i = 0; i < len; i++ ) {
		if ( arr[ i ] === str ) {
			return true;
		}
	}
	return false;
} // end FUNCTION contains()

/**
* FUNCTION: getAnagrams( text )
*	Finds anagrams within a provided text string.
*
* @private
* @param {String} text - text string in which to find anagrams
* @returns {Array|null} array of anagram lists or null
*/
function getAnagrams( text ) {
	var hash,
		keys,
		list,
		out,
		str,
		key,
		len,
		i;

	// [1] Remove any non-alpha or whitespace character. We are only interested in character sequences.
	// [2] Convert all characters to lowercase.
	// [3] Tokenize the text into words/characters.
	text = text
		.replace( /[^a-zA-Z\s]/g, '' )
		.toLowerCase()
		.split( /\s+/ );

	// [4] Create a hash:
	len = text.length;
	hash = {};
	for ( i = 0; i < len; i++ ) {
		// [4.1] Split the word in separate characters:
		str = text[ i ];
		key = str.split( '' );

		// [4.2] Sort the characters to create a hash key:
		key.sort( ascending ).join( '' );

		// [4.3] Look-up key in hash:
		if ( hash.hasOwnProperty( key ) ) {
			// Key already exists. Determine if we have already seen this word before.
			list = hash[ key ];
			if ( !contains( list, str ) ) {
				// Hurray! New anagram!
				list.push( str );
			}
		} else {
			// Initialize a new anagram list.
			hash[ key ] = [ str ];
		}
	}
	// [5] Create an output array containing anagram lists having a length greater than 1.
	keys = Object.keys( hash );
	len = keys.length;
	out = [];
	for ( i = 0; i < len; i++ ) {
		list = hash[ keys[ i ] ];
		if ( list.length > 1 ) {
			out.push( list );
		}
	}
	// [6] Return the anagram lists...
	return ( out.length ) ? out : null;
} // end FUNCTION getAnagrams()


// WIKIPEDIA ANAGRAMS //

/**
* FUNCTION: wanagrams( pages, clbk )
*	Finds anagrams in Wikipedia pages.
*
* @param {String|String[]} pages - Wikipedia page name(s) in which to find anagrams
* @param {Function} clbk - callback to invoke after analyzing Wikipedia page(s)
*/
function wanagrams( pages, clbk ) {
	var isStr = isString( pages ),
		count = 0,
		text = '',
		len,
		i;
	if ( !isStr && !isArray( pages ) ) {
		throw new TypeError( 'wanagrams()::invalid input argument. Must provide either a string or a string array. Value: `' + pages + '`.' );
	}
	if ( isStr ) {
		len = 1;
		wikipedia.from_api( pages, 'en', onPage );
	} else {
		len = pages.length;

		// Make multiple async requests...
		for ( i = 0; i < len; i++ ) {
			wikipedia.from_api( pages[ i ], 'en', onPage );
		}
	}

	/**
	* FUNCTION: onPage( markup )
	*	Callback invoked once a page is loaded from Wikipedia. Converts the page markup to plain text, finds any anagrams contained within the text body, and returns the anagram lists to the provided callback.
	*
	* @private
	* @param {String} markup - page markup
	*/
	function onPage( markup ) {
		count += 1;
		text += wikipedia.plaintext( markup );
		if ( count === len ) {
			done();
		}
	} // end FUNCTION onPage()

	/**
	* FUNCTION: done()
	*	Callback invoked once all pages have been retrieved and their markup converted to plain text.
	*
	* @private
	*/
	function done() {
		var anagrams = getAnagrams( text );
		clbk( anagrams );
	} // end FUNCTION done()
} // end FUNCTION wanagrams()


// EXPORTS //

module.exports = wanagrams;
