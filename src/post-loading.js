import { Animate } from '@wordpress/components';

function PostIsLoading({ attributes, post, isLoading }) {

    const { postSettings } = attributes

    return(
        
        <div className={`bca-card ${postSettings.thumbnailAlignment} is-loading`}>
            {postSettings.showThumbnail && (
                <Animate type="loading">
                    { ( { className } ) => (
                    <div className={`bca-card_thumbnail_container ${className}`}>
                    </div>
                    ) }
                </Animate>

            )}
            <Animate type="loading">
                { ( { className } ) => (
                <div className={`bca-card_headline ${className}`}>                
                </div>
                ) }
            </Animate>

        </div>
    )
}

export default PostIsLoading;