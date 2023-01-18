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
    $metadata = json_decode(file_get_contents( BCA_TEMPLATE_BUILDER_PATH . '/build/blocks/post-card/block.json' ), true);
    if ( ! is_array( $metadata ) || empty( $metadata['name'] ) ) {
		return [];
	}
    
    $post_settings = ( isset( $block->context['bca-template-builder/postSettings'] ) && ! empty( $block->context['bca-template-builder/postSettings'] ) ) ? $block->context['bca-template-builder/postSettings'] : [];
    $post_classes = implode( ' ', get_post_class( 'wp-block-post' ) );
    $style_variables = array(
        '--title-font-size' => $post_settings['titleSettings']['fontSize']
    );
    
    $styles = bca_build_attributes( $style_variables, ':', false );
    
    $classes = implode(
        ' ',
        array(
            $post_classes,
            'bca-card',
            $post_settings['thumbnailSettings']['alignment']
        )
    );
    $attributes = array(
        'class' => $classes,
        'style' => $styles
    );

    $attributes = bca_build_attributes($attributes);
    
    // Build post card componetns like title, thumbnail and excerpt
    $title = sprintf(
        '<h2 class="bca-card_title"><a href="%2$s">%1$s</a></h2>',
        get_the_title(),
        get_the_permalink()
    );
    
    $thumbnail_attrs = array(
        'class' => 'bca-card_thumbnail'
    );
    $thumbnail = sprintf(
        '<a href="%1$s" class="bca-card_thumbnail_container" rel="bookmark">%2$s</a>',
        esc_url(get_the_permalink()),
        get_the_post_thumbnail( null, $post_settings['thumbnailSettings']['size'], $thumbnail_attrs )
    );
    
    $categories = sprintf(
        '<div class="bca-card_categories" rel="categories">%1$s</div>',
        get_the_category_list( ' ' )
    );
    
    $excerpt = has_excerpt() ? sprintf(
        '<div class="bca-card_excerpt" rel="excerpt">%1$s</div>',
        get_the_excerpt()
    ) : '';

    $read_more = sprintf( '<a class="bca-card_readmore" href="%1$s">%2$s</a>',
        get_permalink( get_the_ID() ),
        __( 'Read More', 'textdomain' )
    );
    
    $byline = sprintf( '<div class="bca-card_byline">%1$s</div>',
        get_the_author()
    );
    $content = sprintf(
		'<article %7$s>
            %1$s
            <div class="bca-card_headline">
                %2$s
                %3$s
                %4$s
                %5$s
                %6$s
            </div>
        </article>',
		$post_settings['thumbnailSettings']['show'] ? $thumbnail : '',
		$post_settings['categorySettings']['show'] ? $categories : '',
        $title,
        $post_settings['metaSettings']['author']['show'] ? $byline : '',
        $post_settings['excerptSettings']['show'] ? $excerpt : '',
        $post_settings['readMoreSettings']['show'] ? $read_more : '',
        $attributes
	);

    return $content;
}