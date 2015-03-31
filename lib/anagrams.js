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
* FUNCTION: anagrams( arr )
*	Finds anagrams in an string array.
*
* @param {String[]} arr - input string array
* @returns {Array[]|null} array of anagram lists or null
*/
function anagrams( arr ) {
	var hash,
		keys,
		grams,
		out,
		str,
		key,
		len,
		i;

	// [1] Create a hash...
	hash = {};

	// For each string...
	len = arr.length;
	for ( i = 0; i < len; i++ ) {
		str = arr[ i ];

		// [1.1] Split the string into separate characters.
		// [1.2] Sort the characters.
		// [1.3] Join the sorted characters to create a hash key.
		if ( str.length > 1 ) {
			key = str.split( '' )
				.sort( ascending )
				.join( '' );
		} else {
			key = str;
		}

		// [1.4] Look-up key in hash...
		if ( hash.hasOwnProperty( key ) ) {
			// Key already exists. Determine if we have already seen this string before...
			grams = hash[ key ];
			if ( grams.hasOwnProperty( str ) ) {
				grams[ str ].push( i );
			} else {
				grams[ str ] = [ i ];
			}
		} else {
			// Initialize a new anagram store...
			grams = {};
			grams[ str ] = [ i ];
			hash[ key ] = grams;
		}
	}
	// [2] Create an output array containing anagram lists having a length greater than 1...
	keys = Object.keys( hash );
	len = keys.length;
	out = [];

	for ( i = 0; i < len; i++ ) {
		grams = Object.keys( hash[ keys[ i ] ] );
		if ( grams.length > 1 ) {
			out.push( grams );
		}
	}
	// [3] Return the anagram lists...
	return ( out.length ) ? out : null;
} // end FUNCTION anagrams()


// EXPORTS //

module.exports = anagrams;
