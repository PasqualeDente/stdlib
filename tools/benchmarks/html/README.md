# HTML

> Generate an HTML file for running benchmarks.


<!-- Section to include introductory text. Make sure to keep an empty line after the intro `section` element and another before the `/section` close. -->

<section class="intro">

</section>

<!-- /.intro -->

<!-- Package usage documentation. -->

<section class="usage">

## Usage

``` javascript
var build = require( '@stdlib/tools/benchmarks/html' );
```

#### build( bundle, \[options,\] clbk )

Given a `bundle` URL from which to load a benchmarks bundle, returns an HTML file for running benchmarks.

``` javascript
var bundle = '/foo/bar/bundle.js';

build( bundle, clbk );

function clbk( error, html ) {
    if ( error ) {
        throw error;
    }
    console.log( html );
}
```

The function accepts the following `options`:

* __out__: output file path.
* __title__: HTML title. Default: `'Benchmarks'`.

To specify an output file path, set the `out` option.

``` javascript
var bundle = '/foo/bar/bundle.js';

var opts = {
    'out': '/foo/bar/benchmarks.html'
};

build( bundle, opts, clbk );

function clbk( error ) {
    if ( error ) {
        throw error;
    }
}
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
var build = require( '@stdlib/tools/benchmarks/html' );

build( '/foo/bar/bundle.js', onBuild );

function onBuild( error, html ) {
    if ( error ) {
        throw error;
    }
    console.log( html );
}
```

</section>

<!-- /.examples -->

<!-- Section for describing a command-line interface. -->

---

<section class="cli">

## CLI

<!-- CLI usage documentation. -->

<section class="usage">

### Usage

``` bash
Usage: benchmarks-html [options] url

Options:

  -h,    --help                Print this message.
  -V,    --version             Print the package version.
         --title title         HTML title.
```

</section>

<!-- /.usage -->

<!-- CLI usage notes. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="notes">

</section>

<!-- /.notes -->

<!-- CLI usage examples. -->

<section class="examples">

### Examples

``` bash
$ benchmarks-html /foo/bar/beep.js
```

</section>

<!-- /.examples -->

</section>

<!-- /.cli -->

<!-- Section to include cited references. If references are included, add a horizontal rule *before* the section. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="references">

</section>

<!-- /.references -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

</section>

<!-- /.links -->
