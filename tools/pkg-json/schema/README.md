# JSON Schema

> [JSON schema][json-schema] for `package.json`.


<!-- Section to include introductory text. Make sure to keep an empty line after the intro `section` element and another before the `/section` close. -->

<section class="intro">

</section>

<!-- /.intro -->

<!-- Package usage documentation. -->

<section class="usage">

## Usage

``` javascript
var schema = require( '@stdlib/tools/pkg-json/schema' );
```

#### schema()

Returns a [JSON schema][json-schema] for `package.json`.

``` javascript
var json = schema();
// returns <Object>
```

</section>

<!-- /.usage -->

<!-- Package usage notes. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="notes">

</section>

<!-- /.notes -->

<!-- Package usage examples. -->

<section class="examples">

## Examples

``` javascript
var Ajv = require( 'ajv' );
var schema = require( '@stdlib/tools/pkg-json/schema' );

var pkg = require( './package.json' );
var ajv = new Ajv();

var bool = ajv.validate( schema(), pkg );
var errs = ajv.errors;
```

</section>

<!-- /.examples -->

<!-- Section to include cited references. If references are included, add a horizontal rule *before* the section. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="references">

</section>

<!-- /.references -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[json-schema]: http://json-schema.org/

</section>

<!-- /.links -->
