/**
*
*	ANAGRAMS
*
*
*	DESCRIPTION:
*		- Finds anagrams in an array of strings.
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
* @private
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
* FUNCTION: anagrams( arr )
*	Finds anagrams in an string array.
*
* @param {String[]} arr - input string array
* @returns {Array[]|null} array of anagram lists or null
*/
function anagrams( arr ) {
	var hash,
		keys,
		list,
		out,
		str,
		key,
		len,
		i;

	// [1] Create a hash...
	len = arr.length;
	hash = {};

	// For each string...
	for ( i = 0; i < len; i++ ) {
		// [1.1] Split the string into separate characters:
		str = arr[ i ];
		key = str.split( '' );

		// [1.2] Sort the characters to create a hash key:
		key.sort( ascending ).join( '' );

		// [1.3] Look-up key in hash...
		if ( hash.hasOwnProperty( key ) ) {
			// Key already exists. Determine if we have already seen this string before...
			list = hash[ key ];
			if ( !contains( list, str ) ) {
				// Hurray! New anagram!
				list.push( str );
			}
		} else {
			// Initialize a new anagram list:
			hash[ key ] = [ str ];
		}
	}
	// [2] Create an output array containing anagram lists having a length greater than 1...
	keys = Object.keys( hash );
	len = keys.length;
	out = [];
	for ( i = 0; i < len; i++ ) {
		list = hash[ keys[ i ] ];
		if ( list.length > 1 ) {
			out.push( list );
		}
	}
	// [3] Return the anagram lists...
	return ( out.length ) ? out : null;
} // end FUNCTION anagrams()


// EXPORTS //

module.exports = anagrams;
