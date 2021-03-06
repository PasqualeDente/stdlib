#!/usr/bin/env Rscript

# Set the precision to 16 digits:
options( digits = 16 );

#' Run benchmarks.
#'
#' @examples
#' main();
main <- function() {
	# Define benchmark parameters:
	name <- "TODO";
	iterations <- 1000000L;
	repeats <- 3;

	#' Print the TAP version.
	#'
	#' @examples
	#' print_version();
	print_version <- function() {
		cat( "TAP version 13\n" );
	}

	#' Print the TAP summary.
	#'
	#' @param total Total number of tests.
	#' @param passing Total number of passing tests.
	#'
	#' @examples
	#' print_summary( 3, 3 );
	print_summary <- function( total, passing ) {
		cat( "#\n" );
	    cat( paste0( "1..", total, "\n" ) ); # TAP plan
	    cat( paste0( "# total ", total, "\n" ) );
	    cat( paste0( "# pass  ", passing, "\n" ) );
	    cat( "#\n" );
	    cat( "# ok\n" );
	}

	#' Print benchmark results.
	#'
	#' @param iterations Number of iterations.
	#' @param elapsed Elapsed time in seconds.
	#'
	#' @examples
	#' print_results( 1000L, 0.131009101868 );
	print_results <- function( iterations, elapsed ) {
		rate <- iterations / elapsed;
	    cat( "  ---\n" );
	    cat( paste0( "  iterations: ", iterations, "\n" ) );
	    cat( paste0( "  elapsed: ", elapsed, "\n" ) );
	    cat( paste0( "  rate: ", rate, "\n" ) );
	    cat( "  ...\n" );
	}

	#' Run a benchmark.
	#'
	#' ## Notes
	#'
	#' * We compute and return a total "elapsed" time, rather than the minimum
	#'   evaluation time, to match benchmark results in other languages (e.g.,
	#'   Python).
	#'
	#'
	#' @param iterations Number of Iterations.
	#' @return elapsed time in seconds
	#'
	#' @examples
	#' elapsed <- benchmark( 1000L );
	benchmark <- function( iterations ) {
		# Run the benchmarks:
		results <- microbenchmark::microbenchmark( TODO( TODO ), times = iterations );

		# Sum all the raw timing results to get a total "elapsed" time:
		elapsed <- sum( results$time );

		# Convert the elapsed time from nanoseconds to seconds:
		elapsed <- elapsed / 1.0e9;

		return( elapsed );
	}

	print_version();
	for ( i in 1:repeats ) {
		cat( paste0( "# r::", name, "\n" ) );
		elapsed <- benchmark( iterations );
		print_results( iterations, elapsed );
		cat( paste0( "ok ", i, " benchmark finished", "\n" ) );
	}
	print_summary( repeats, repeats );
}

main();
