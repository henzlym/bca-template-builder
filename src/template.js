
import Post from './components/post';
import PostIsLoading from './post-loading';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import {
    BlockContextProvider,
    useBlockProps,
    useInnerBlocksProps
} from '@wordpress/block-editor';

const ALLOWED_BLOCKS = ['bca/post-card'];

function Posts({ className, style, Template }) {
    const innerBlocksProps = useInnerBlocksProps({ className: `${className}`, style }, {
        allowedBlocks: ALLOWED_BLOCKS,
        template: Template,
        templateLock: 'insert',
    });
    return <div {...innerBlocksProps} />
}

export default function Template({ attributes, posts, isLoading, setAttributes }) {

    const { columns, gridGap, layout, query: { per_page }, template, textAlignment } = attributes;

    if (posts == null) {
        return (
            <div
                className={`template-${template} ${layout} ${textAlignment} ${isLoading} ${(layout == 'columns') ? `columns-${columns}` : ''}`}
                style={{ gridColumnGap: gridGap }}
            >
                {
                    Array.from(Array(per_page).keys()).map((post) => {
                        return <PostIsLoading {...{ attributes, post, isLoading }} />
                    })
                }
            </div>
        )
    }

    let classes = `template-${template} ${layout} ${textAlignment} ${isLoading} ${(layout == 'columns') ? `columns-${columns}` : ''}`;
    let Template = posts.map((post, index) => {
        return [ 'bca/post-card', { index: index } ];
    })
    return (
        <BlockContextProvider
            value={{ posts: posts, isLoading:isLoading, layout:layout }}
        >
            <Posts className={classes} style={{ gridColumnGap: gridGap }} Template={Template} />
        </BlockContextProvider>
    );

}
