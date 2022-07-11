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
export default function PostAuthorControls({postSettings, onChange}) {
    const { metaSettings } = postSettings
    return (
        <Fragment>
            <ToggleControl
                label="Display author"
                checked={metaSettings.author.show}
                onChange={(checked) => {
                    onChange({ metaSettings:{...metaSettings,author:{...metaSettings.author,show:checked}} });
                }}
            />
            {metaSettings.author.show && (
                <ToggleControl
                    label="Display author icon"
                    checked={metaSettings.author.showIcon}
                    onChange={(checked) => {
                        onChange({ metaSettings:{...metaSettings,author:{...metaSettings.author,showIcon:checked}} });
                    }}
                />
            )}
        </Fragment>
    )
}