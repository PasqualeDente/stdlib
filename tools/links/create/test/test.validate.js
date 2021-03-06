'use strict';

// MODULES //

var tape = require( 'tape' );
var validate = require( './../lib/validate.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof validate, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns an error if provided an options argument which is not an object', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'5',
		5,
		true,
		void 0,
		null,
		NaN,
		function noop() {},
		[]
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, values[ i ] );
		t.equals( err instanceof TypeError, true, 'returns a type error when provided '+values[i] );
	}
	t.end();
});

tape( 'the function returns an error if not provided `uri`, `id`, and `description` options', function test( t ) {
	var values;
	var opts;
	var err;
	var i;

	values = [
		{
			'description': 'A standard library for JavaScript and Node.js.',
			'id': 'stdlib'
		},
		{
			'uri': 'http://stdlib.io/',
			'id': 'stdlib'
		},
		{
			'description': 'A standard library for JavaScript and Node.js.',
			'id': 'stdlib'
		},
		{
			'description': 'A standard library for JavaScript and Node.js.'
		},
		{
			'uri': 'http://stdlib.io/'
		},
		{
			'id': 'stdlib'
		},
		{}
	];

	for ( i = 0; i < values.length; i++ ) {
		opts = values[ i ];
		err = validate( {}, opts );
		t.equals( err instanceof TypeError, true, 'returns a type error' );
	}
	t.end();
});

tape( 'the function returns an error if provided a `uri` option which is not a string', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		5,
		void 0,
		null,
		NaN,
		[],
		{},
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'uri': values[ i ],
			'id': 'stdlib',
			'description': 'A standard library for JavaScript and Node.js.'
		});
		t.equal( err instanceof TypeError, true, 'returns a type error when provided '+values[i] );
	}
	t.end();
});

tape( 'the function returns an error if provided a `id` option which is not a string', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		5,
		void 0,
		null,
		NaN,
		[],
		{},
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'uri': 'http://stdlib.io/',
			'id': values[ i ],
			'description': 'A standard library for JavaScript and Node.js.'
		});
		t.equal( err instanceof TypeError, true, 'returns a type error when provided '+values[i] );
	}
	t.end();
});

tape( 'the function returns an error if provided a `description` option which is not a string', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		5,
		void 0,
		null,
		NaN,
		[],
		{},
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'uri': 'http://stdlib.io/',
			'id': 'stdlib',
			'description': values[ i ]
		});
		t.equal( err instanceof TypeError, true, 'returns a type error when provided '+values[i] );
	}
	t.end();
});

tape( 'the function returns an error if provided a `database` option which is not a string', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		5,
		void 0,
		null,
		NaN,
		[],
		{},
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'uri': 'http://stdlib.io/',
			'id': 'stdlib',
			'description': 'A standard library for JavaScript and Node.js.',
			'database': values[ i ]
		});
		t.equal( err instanceof TypeError, true, 'returns a type error when provided '+values[i] );
	}
	t.end();
});

tape( 'the function returns an error if provided a `keywords` option which is not an array of string primitives', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		5,
		void 0,
		null,
		NaN,
		[],
		{},
		function noop() {},
		[ 1, 2, 3 ]
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'uri': 'http://stdlib.io/',
			'id': 'stdlib',
			'description': 'A standard library for JavaScript and Node.js.',
			'keywords': values[ i ]
		});
		t.equal( err instanceof TypeError, true, 'returns a type error when provided '+values[i] );
	}
	t.end();
});

tape( 'the function returns null if all options are valid', function test( t ) {
	var options;
	var opts;
	var err;

	options = {
		'uri': 'http://stdlib.io/',
		'id': 'stdlib',
		'description': 'A standard library for JavaScript and Node.js.',
		'database': '/foo/bar/baz.json'
	};
	opts = {};
	err = validate( opts, options );

	t.equal( err, null, 'returns null' );
	t.deepEqual( opts, options, 'sets option values' );

	t.end();
});

tape( 'the function ignores unrecognized/unsupported options', function test( t ) {
	var expected;
	var options;
	var opts;
	var err;

	options = {
		'uri': 'http://stdlib.io/',
		'id': 'stdlib',
		'description': 'A standard library for JavaScript and Node.js.',
		'beep': true, // misc options
		'boop': 'bop'
	};
	expected = {
		'uri': 'http://stdlib.io/',
		'id': 'stdlib',
		'description': 'A standard library for JavaScript and Node.js.'
	};
	opts = {};
	err = validate( opts, options );

	t.equal( err, null, 'returns null' );
	t.deepEqual( opts, expected, 'only sets mandatory options' );
	t.end();
});
