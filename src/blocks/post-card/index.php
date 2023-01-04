<?php
/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function bca_post_card_init() {
	register_block_type( 
        BCA_TEMPLATE_BUILDER_PATH . '/build/blocks/post-card',
        array(
            'render_callback' => 'bca_post_card_render',
        )
    );
}
add_action( 'init', 'bca_post_card_init' );

function bca_post_card_render( $attributes, $content, $block )
{
    global $post;
    
    $metadata = wp_json_file_decode( BCA_TEMPLATE_BUILDER_PATH . '/build/blocks/post-card/block.json', array( 'associative' => true ) );
    if ( ! is_array( $metadata ) || empty( $metadata['name'] ) ) {
		return [];
	}
    
    $post_settings = ( isset( $block->context['bca-template-builder/postSettings'] ) && ! empty( $block->context['bca-template-builder/postSettings'] ) ) ? $block->context['bca-template-builder/postSettings'] : [];
    $text_alignment = ( isset( $block->context['bca-template-builder/textAlignment'] ) && ! empty( $block->context['bca-template-builder/textAlignment'] ) ) ? $block->context['bca-template-builder/textAlignment'] : "left";

    $thumbnail_attrs = array(
        'class' => 'bca-card_thumbnail'
    );
    do_action( 'qm/debug', [$post->ID, $block->context] );

    $classes = implode(
        ' ',
        array(
            $text_alignment
        )
    );
    remove_filter( 'the_content', 'wpautop' );

    return sprintf(
		'<div class="bca-card %6$s">
            %1$s
            <div class="bca-card_headline">
                %2$s
                %3$s
                %4$s
                %5$s
            </div>
        </div>',
		get_the_post_thumbnail( '', '', $thumbnail_attrs ),
		get_the_category_list( ' ' ),
        the_title( '<h2 class="bca-card_title">', '</h2>', false ),
        '',
        get_the_excerpt(),
        $classes
	);
    add_filter( 'the_content', 'wpautop' );

}

function bca_card_post_thumbnail_html( $html )
{
    $html = sprintf(
        '<a href="%1s" class="bca-card_thumbnail_container" rel="bookmark">%2s</a>',
        esc_attr(esc_url(get_permalink())),
        $html
    );
    return $html;
}
add_filter('post_thumbnail_html', 'bca_card_post_thumbnail_html', 10, 5);

function bca_card_the_category( $thelist, $separator, $parents )
{
    $thelist = sprintf(
        '<div class="bca-card_categories" rel="categories">%1s</div>',
        $thelist
    );
    return $thelist;
}
add_filter( 'the_category', 'bca_card_the_category', 10, 3 );

function bca_card_get_the_excerpt( $post_excerpt, $post )
{
    $post_excerpt = sprintf(
        '<div class="bca-card_excerpt" rel="excerpt">%1s</div>',
        $post_excerpt
    );
    return $post_excerpt;
}
add_filter( 'get_the_excerpt', 'bca_card_get_the_excerpt', 10, 3 );