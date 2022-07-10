<?php
/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function bca_post_card_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'bca_post_card_init' );