'use strict';

var getAnagrams = require( './../lib' );

// Specify Wikipedia pages either by page title or by URL...
var pages = [
	'Linear regression',
	'http://en.wikipedia.org/wiki/ballet',
	'Spain',
	'Mathematics'
];

/**
* FUNCTION: onAnagrams( error, hashes )
*	Callback invoked after finding anagrams within the specified Wikipedia pages.
*
* @param {Object} error - error object
* @param {Object[]} hashes - array of anagram hashes
*/
function onAnagrams( error, hashes ) {
	var hash,
		len,
		i;

	if ( error ) {
		throw new Error( error );
	}
	// Print the individual results...
	len = hashes.length;
	for ( i = 0; i < len; i++ ) {
		console.log( pages[ i ] + '...' );
		console.log( hashes[ i ].get() );
		console.log( '\n' );
	}
	// Merge the two hashes...
	hash = hashes[ 0 ];
	hash.merge.apply( hash, hashes.slice( 1 ) );

	// Print the merged hash...
	console.log( 'Merged...' );
	console.log( hash.get() );
} // end FUNCTION onAnagrams()

// Run the analysis...
getAnagrams( pages, onAnagrams );
