'use strict';

var wanagrams = require( './../lib' );

function onAnagrams( arr ) {
	console.log( arr );
}

wanagrams( 'Linear regression', onAnagrams );
