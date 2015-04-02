#!/usr/bin/env node
'use strict';

// MODULES //

var fs = require( 'fs' ),
	path = require( 'path' ),
	parseArgs = require( 'minimist' ),
	getAnagrams = require( './../lib' ),
	aStream = require( './../lib/stream.js' );


// INIT //

process.stdout.on( 'error', process.exit );


// ARGUMENTS //

var opts,
	args;

opts = {
	'string': [
		'encoding',
		'language'
	],
	'boolean': [
		'help',
		'version',
		'no-decodestrings',
		'no-halfopen',
		'objectmode'
	],
	'alias': {
		'help': [
			'h'
		],
		'version': [
			'V'
		],
		'encoding': [
			'enc'
		],
		'no-decodestrings': [
			'nds'
		],
		'no-halfopen': [
			'nho'
		],
		'highwatermark': [
			'hwm'
		],
		'objectmode': [
			'om'
		],
		'language': [
			'lang'
		]
	}
};

args = parseArgs( process.argv.slice( 2 ), opts );


// HELP //

function onClose() {
	process.exit( 1 );
}

if ( args.help ) {
	fs.createReadStream( path.join( __dirname, 'usage.txt' ) )
		.pipe( process.stdout )
		.on( 'close', onClose );
    return;
}


// VERSION //

if ( args.version ) {
	console.log( require( '../package.json' ).version );
	return;
}


// ANAGRAMS //

var rsrc = args._;

// Source mode or transform mode?
opts = {};
if ( rsrc.length ) {
	if ( args.hasOwnProperty( 'language' ) ) {
		opts.lang = args.language;
	}
	getAnagrams( rsrc, opts, onAnagrams );
}
// Receiving markup from standard in => transform mode...
else {
	// encoding: (default: null)
	if ( args.hasOwnProperty( 'encoding' ) ) {
		opts.encoding = args.encoding;
	}
	// allowHalfOpen: (default: true)
	if ( args[ 'no-halfopen' ] ) {
		opts.allowHalfOpen = false;
	}
	// highWaterMark: (default: 16kb)
	if ( args.hasOwnProperty( 'highwatermark' ) ) {
		opts.highWaterMark = args.highwatermark;
	}
	// decodeStrings: (default: true)
	if ( args[ 'no-decodestrings' ] ) {
		opts.decodeStrings = false;
	}
	// objectMode: (default: false)
	if ( args[ 'objectmode' ] ) {
		opts.objectMode = true;
	}
	process.stdin
		.pipe( aStream( opts ) )
		.pipe( process.stdout );
}

/**
* FUNCTION: onAnagrams( error, hashes )
*	Callback invoked after searching for anagrams in Wikipedia resources.
*
* @private
* @param {Object|null} error - error object
* @param {Array} hashes - array of anagram hashes
*/
function onAnagrams( error, hashes ) {
	var hash,
		blob,
		len,
		i;
	if ( error ) {
		throw new Error( error );
	}
	// Assemble a JSON blob...
	blob = {};
	len = hashes.length;
	for ( i = 0; i < len; i++ ) {
		blob[ rsrc[ i ] ] = hashes[ i ].get();
	}
	// Create a combined hash...
	hash = hashes[ 0 ].copy();
	hash.merge.apply( hash, hashes.slice( 1 ) );
	blob[ '__merged__' ] = hash.get();

	// Serialize the blob and write to stdout:
	process.stdout.write( JSON.stringify( blob ) );
} // end FUNCTION onAnagrams()
