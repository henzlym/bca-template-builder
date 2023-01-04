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
define('BCA_TEMPLATE_BUILDER_URL', plugin_dir_url( __FILE__ ) );
define('BCA_TEMPLATE_BUILDER_PATH', plugin_dir_path( __FILE__ ) );
// Include Neset Blocks
require_once plugin_dir_path(__FILE__) . './src/blocks/post-card/index.php';
/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_bca_template_builder_block_init()
{
    register_block_type(
        BCA_TEMPLATE_BUILDER_PATH . '/build',
        array(
            'render_callback' => 'bca_template_builder_render',
            'skip_inner_blocks' => true,
        )
    );
}
add_action('init', 'create_block_bca_template_builder_block_init');

function bca_template_builder_rest_api_init()
{
    register_rest_route('bca/v2', '/bca/query/', array(
        'methods' => 'GET',
        'callback' => 'bca_get_post_query',
    ));
}

add_action('rest_api_init', 'bca_template_builder_rest_api_init');

function __get_blocks( $block_name, $post = null )
{
    
    $post = get_post( $post );
    
    if ($post == null || is_wp_error( $post ) ) {
        return $post;
    }
    
    if( !has_block( $block_name, $post ) ) return [];
    
    $blocks = parse_blocks( $post->post_content );
    $blocks_found = [];
    foreach ($blocks as $key => $block) {
        if ( $block_name !== $block['blockName'] ) continue;
        $blocks_found[] = $block;
    }
    
    return $blocks_found;
}
function bca_get_post_query( $request )
{
    
    $blocks_found = __get_blocks( 'bca/template-builder', $request['id'] );
    if (!is_array($blocks_found)||empty($blocks_found)) return $blocks_found;
    
    $metadata = wp_json_file_decode( __DIR__ . '/build/block.json', array( 'associative' => true ) );
    if ( ! is_array( $metadata ) || empty( $metadata['name'] ) ) {
		return [];
	}
    $default_query = $metadata['attributes']['query']['default'];
    $default_query['_fields'] = 'id';
    $queries = [];
    $posts = [];
    foreach ($blocks_found as $key => $block) {
        $url = add_query_arg( $default_query, get_rest_url( null, 'wp/v2/posts' ) );
    
        $response = wp_remote_get( $url );
        
        if (
            is_wp_error($response)
            || 200 !== wp_remote_retrieve_response_code($response)
            || empty(wp_remote_retrieve_body($response))
        ) {
            return $response;
        }
        
        $remote = json_decode(wp_remote_retrieve_body($response), true);
        $queries[] = $remote;
    }

    if (is_array($queries)&&!empty($queries)) {
        return $queries;
    }
    
    return $blocks_found;
}

function bca_template_builder_render( $attributes, $content, $block )
{
    global $post;
    $content = "";
    $metadata = wp_json_file_decode( __DIR__ . '/build/block.json', array( 'associative' => true ) );
    if ( ! is_array( $metadata ) || empty( $metadata['name'] ) ) {
		return [];
	}
    
    $template = ( isset( $attributes['template'] ) ) ? $attributes['template'] : $metadata['attributes']['template']['default'];
    $text_alignment = ( isset( $attributes['textAlignment'] ) ) ? $attributes['textAlignment'] : $metadata['attributes']['textAlignment']['default'];
    $layout = ( isset( $attributes['layout'] ) ) ? $attributes['layout'] : $metadata['attributes']['layout']['default'];

    $default_query = $metadata['attributes']['query']['default'];
    $default_post_settings = $metadata['attributes']['postSettings']['default'];
    $post_settings = ( isset( $attributes['postSettings'] ) ) ? $attributes['postSettings'] : $default_post_settings;
    $query_args = ( isset( $attributes['query'] ) ) ? $attributes['query'] : $default_query;
    $query_args['posts_per_page'] = $query_args['per_page'];
    unset( $query_args['per_page'] );
    unset( $query_args['_embed'] );
    unset( $query_args['types'] );

    $query = new WP_Query( $query_args );
    // do_action( 'qm/debug', [$attributes, $content, $block] );

    if ( ! $query->have_posts() ) {
		return '';
	}
    
    $inner_blocks_count = 0;
    while ( $query->have_posts() ) {
		$query->the_post();

		// Get an instance of the current Post Template block.
		$block_instance = $block->parsed_block;
        $block_instance = $block_instance['innerBlocks'][$inner_blocks_count];
		// Set the block name to one that does not correspond to an existing registered block.
		// This ensures that for the inner instances of the Post Template block, we do not render any block supports.
		$block_instance['blockName'] = $block_instance['blockName'];


		// Render the inner blocks of the Post Template block with `dynamic` set to `false` to prevent calling
		// `render_callback` and ensure that no wrapper markup is included.
		$block_content = (
			new WP_Block(
				$block_instance,
				array(
                    "bca-template-builder/postSettings" => $post_settings,
                    "bca-template-builder/textAlignment" => $text_alignment
				)
			)
		)->render();
        // do_action( 'qm/debug', [$block_instance, $block_content] );

        $inner_blocks_count++;
		
        // Wrap the render inner blocks in a `li` element with the appropriate post classes.
		$post_classes = implode( ' ', get_post_class( 'wp-block-post' ) );
		$content     .= $block_content;
	}
    
    wp_reset_postdata();
    
    $classes = implode(
        ' ',
        array(
            'template-' . $template,
            $text_alignment,
            $layout
        )
    );
    return sprintf(
		'<div class="wp-block-bca-template-builder"><div class="%1$s">%2$s</div></div>',
		$classes,
		$content
	);
    
    return $content;
}