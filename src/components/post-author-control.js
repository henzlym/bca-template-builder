/**
 * External dependencies
 */
import { Fragment } from 'react';

/**
 * Wordpress dependecies.
 *
 */
import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
export default function PostAuthorControls(props) {
    const { attributes: { postSettings }, setAttributes } = props;
    return (
        <Fragment>
            <ToggleControl
                label="Display author"
                checked={postSettings.showAuthor}
                onChange={(checked) => {
                    setAttributes({ postSettings: { ...postSettings, showAuthor: checked } });
                }}
            />
            {postSettings.showAuthor && (
                <ToggleControl
                    label="Display author icon"
                    checked={postSettings.showAuthorIcon}
                    onChange={(checked) => {
                        setAttributes({ postSettings: { ...postSettings, showAuthorIcon: checked } });
                    }}
                />
            )}
        </Fragment>
    )
}