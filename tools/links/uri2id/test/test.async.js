'use strict';

// MODULES //

var tape = require( 'tape' );
var noop = require( '@stdlib/utils/noop' );
var uri2id = require( './../lib/async.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof uri2id, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws an error if the first argument is not a URI', function test( t ) {
	var values;
	var i;
	values = [
		5,
		'abc',
		NaN,
		null,
		void 0,
		true,
		{},
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			uri2id( value, function clbk() {} );
		};
	}
});

tape( 'the function throws an error if provided an options argument which is not an object', function test( t ) {
	var values;
	var i;
	values = [
		5,
		'abc',
		NaN,
		null,
		void 0,
		true,
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			uri2id( 'https://www.sublimetext.com/', value, noop );
		};
	}
});

tape( 'the function throws an error if provided a callback argument which is not a function', function test( t ) {
	var values;
	var i;
	values = [
		5,
		'abc',
		NaN,
		null,
		void 0,
		true,
		{},
		[]
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			uri2id( 'https://www.sublimetext.com/', value );
		};
	}
});

tape( 'the function throws an error if provided a callback argument which is not a function (options object)', function test( t ) {
	var values;
	var i;
	values = [
		5,
		'abc',
		NaN,
		null,
		void 0,
		true,
		{},
		[]
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			uri2id( 'https://www.sublimetext.com/', {}, value );
		};
	}
});

tape( 'if the function encounters an error when attempting to read a database, the function returns the error', function test( t ) {
	uri2id( 'https://www.sublimetext.com/', {
		'database': './nonexisting.json'
	}, onRead );

	function onRead( error ) {
		if ( error ) {
			t.ok( true, error.message );
		} else {
			t.ok( false, 'expected an error' );
		}
		t.end();
	}
});

tape( 'the function returns the id corresponding to a given URI', function test( t ) {
	uri2id( 'https://www.sublimetext.com/', onRead );

	function onRead( error, uri ) {
		if ( error ) {
			t.ok( false, 'did not expect an error' );
		}
		t.strictEqual( uri, 'sublime-text', 'returns correct id' );
		t.end();
	}
});

tape( 'the function returns `null` if the URI is not found in the database', function test( t ) {
	uri2id( 'https://www.not-there.com', onRead );

	function onRead( error, uri ) {
		if ( error ) {
			t.ok( false, 'did not expect an error' );
		}
		t.strictEqual( uri, null, 'returns null' );
		t.end();
	}
});

tape( 'the function returns the id corresponding to a given URI (custom database)', function test( t ) {
	uri2id( 'https://www.sublimetext.com/', {
		'database': './test/fixtures/database.json'
	}, onRead );

	function onRead( error, uri ) {
		if ( error ) {
			t.ok( false, 'did not expect an error' );
		}
		t.strictEqual( uri, 'sublime-text', 'returns correct id' );
		t.end();
	}
});
