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
	wikipedia = require( 'wtf_wikipedia' ),
	preprocess = require( './preprocess.js' ),
	getAnagrams = require( './anagrams.js' );


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
		var anagrams = getAnagrams( preprocess( text ) );
		clbk( anagrams );
	} // end FUNCTION done()
} // end FUNCTION wanagrams()


// EXPORTS //

module.exports = wanagrams;
