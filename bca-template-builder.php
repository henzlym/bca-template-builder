<?php
/**
 * Plugin Name:       Blk Canvas - Template Builder
 * Description:       Template Builder using gutenberg blocks.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Henzly Meghie
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       bca
 *
 * @package           create-block
 */

// Include Neset Blocks
// require_once plugin_dir_path(__FILE__) . './src/blocks/post-card/index.php';
/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_bca_template_builder_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_bca_template_builder_block_init' );
