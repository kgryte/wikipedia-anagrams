/**
*
*	PREPROCESS
*
*
*	DESCRIPTION:
*		- Sanitizes and tokenizes text.
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

/**
* FUNCTION: preprocess( text )
*	Preprocesses text by sanitizing and tokenizing.
*
* @param {String} text - text to preprocess
* @returns {Array} array of tokenized strings
*/
function preprocess( text ) {
	// [1] Remove any non-alpha or whitespace character. We are only interested in character sequences.
	// [2] Convert all characters to lowercase.
	// [3] Tokenize the text into words/characters.
	return text
		.replace( /[^a-zA-Z\s]/g, '' )
		.toLowerCase()
		.split( /\s+/ );
} // end FUNCTION preprocess()


// EXPORTS //

module.exports = preprocess;
