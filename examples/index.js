'use strict';

var getAnagrams = require( './../lib' );

// Specify Wikipedia resources either by page title or by URL...
var resources = [
	'Linear regression',
	'http://en.wikipedia.org/wiki/ballet',
	'http://es.wikipedia.org/wiki/ballet',
	'Spain',
	'President of the United States',
	'Mathematics'
];

// Run the analysis...
getAnagrams( resources, onAnagrams );

/**
* FUNCTION: onAnagrams( error, hashes )
*	Callback invoked after finding anagrams within the specified Wikipedia resources.
*
* @param {Object|null} error - error object
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
		console.log( resources[ i ] + '...' );
		console.log( hashes[ i ].get() );
		console.log( '\n' );
	}
	// Merge the hashes...
	hash = hashes[ 0 ];
	hash.merge.apply( hash, hashes.slice( 1 ) );

	// Print the merged hash...
	console.log( 'Merged...' );
	console.log( hash.get() );
} // end FUNCTION onAnagrams()
