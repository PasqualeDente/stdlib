'use strict';

// MODULES //

var resolve = require( 'path' ).resolve;
var getKeys = require( 'object-keys' ).shim();
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isFunction = require( '@stdlib/assert/is-function' );
var readJSON = require( '@stdlib/fs/read-json' );
var cwd = require( '@stdlib/utils/cwd' );
var config = require( './defaults.js' );
var validate = require( './validate.js' );


// MAIN //

/**
* Returns the URI corresponding to a provided id.
*
* @param {string} id - id
* @param {Options} [options] - options
* @param {string} [options.database] - path to a link database file (JSON)
* @param {Callback} clbk - callback to invoke upon resolving an id
* @throws {TypeError} first argument must be a string
* @throws {TypeError} options argument must be an object
* @throws {TypeError} must provide valid options
* @throws {TypeError} last argument must be a function
*
* @example
* id2uri( 'bibtex', clbk );
*
* function clbk( error, uri ) {
*   if ( error ) {
*       throw error;
*   }
*   console.log( uri );
* 	// => 'http://www.bibtex.org/'
* }
*/
function id2uri( id, options, clbk ) {
	var fopts;
	var opts;
	var err;
	var cb;
	if ( !isString( id ) ) {
		throw new TypeError( 'invalid input argument. First argument must be a string. Value: `'+id+'`.' );
	}
	opts = {
		'database': config.database
	};
	if ( arguments.length === 2 ) {
		cb = options;
	} else {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
		cb = clbk;
	}
	if ( !isFunction( cb ) ) {
		throw new TypeError( 'invalid input argument. Last argument must be a function. Value: `'+cb+'`.' );
	}
	opts.database = resolve( cwd(), opts.database );
	fopts = {
		'encoding': 'utf8'
	};
	readJSON( opts.database, fopts, onRead );

	/**
	* Callback invoked upon reading a file.
	*
	* @private
	* @param {(Error|null)} error - error object
	* @param {Object} db - database
	* @returns {void}
	*/
	function onRead( error, db ) {
		var keys;
		var i;
		if ( error ) {
			return cb( error );
		}
		keys = getKeys( db );
		for ( i = 0; i < keys.length; i++ ) {
			if ( db[ keys[ i ] ].id === id ) {
				return cb( null, keys[ i ] );
			}
		}
		cb( null, null );
	} // end FUNCTION onRead()
} // end FUNCTION id2uri()


// EXPORTS //

module.exports = id2uri;
