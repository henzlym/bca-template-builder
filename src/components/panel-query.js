/**
 * Wordpress dependecies.
 *
 */
 import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import apiFetch from '@wordpress/api-fetch';
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { useDebounce } from '@wordpress/compose'; 
import { useCallback, useEffect, useMemo, useState } from '@wordpress/element';
import { addQueryArgs } from '@wordpress/url';
import {
    BaseControl,
    FontSizePicker,
    FormTokenField,
    Panel,
    PanelBody,
    RangeControl,
    RadioControl,
    SelectControl,
    TextControl,
    ToggleControl
} from '@wordpress/components';
import {
    filter
} from '@wordpress/icons';
import { TermsControl } from '.';

const orderOptions = [
	{
		label: __( 'Newest to oldest' ),
		value: 'date/desc',
	},
	{
		label: __( 'Oldest to newest' ),
		value: 'date/asc',
	},
	{
		/* translators: label for ordering posts by title in ascending order */
		label: __( 'A → Z' ),
		value: 'title/asc',
	},
	{
		/* translators: label for ordering posts by title in descending order */
		label: __( 'Z → A' ),
		value: 'title/desc',
	},
];
function OrderControl( { order, orderBy, onChange } ) {
	return (
		<SelectControl
			label={ __( 'Order by' ) }
			value={ `${ orderBy }/${ order }` }
			options={ orderOptions }
			onChange={ onChange }
		/>
	);
}

function PostTypeSelectControl({ value, onChange }){
    
    const postTypes = useSelect( ( select ) => {
		const { getPostTypes } = select( coreStore );
		const excludedPostTypes = [ 'attachment' ];
		const filteredPostTypes = getPostTypes( { per_page: -1 } )?.filter(
			( { viewable, slug } ) =>
				viewable && ! excludedPostTypes.includes( slug )
		);
		return filteredPostTypes;
	}, [] );

    if (postTypes.length == 0) {
        return null;
    }

    const postTypeOptions = postTypes.map((postType) => {
        return { label: postType.labels.singular_name, value: postType.slug }
    });

    return(
        <SelectControl
            label="Post type"
            value={ value }
            options={ postTypeOptions }
            onChange={ onChange }
            __nextHasNoMarginBottom
        />
    )
}
export default function PanelQuery({ attributes, setAttributes }) {
    const { query } = attributes;
    const { 
        categories,
		tags,
        per_page, 
        offset, 
        order, 
        orderby, 
        types 
    } = query;

    return(
        <Panel>
            <PanelBody title="Filtering/Sorting settings:" initialOpen={false}>
                <PostTypeSelectControl
                    value={types}
                    onChange={ (type) => {
                        setAttributes({ query:{ ...query, types:type } })
                    }}
                />
                <OrderControl
                    order={order}
                    orderby={orderby}
                    onChange={ ( value ) => {
                        const [ newOrderBy, newOrder ] = value.split( '/' );
                        setAttributes({ query:{ ...query, order: newOrder, orderBy: newOrderBy } });
                    }}
                />
                <TermsControl
                    label={'Categories'}
                    taxonomy={'categories'}
                    value={categories}
                    onChange={ ( tokens ) => {
                        setAttributes({ query:{ ...query, categories: tokens } });
                    }}
                />
                <TermsControl
                    label={'Tags'}
                    taxonomy={'tags'}
                    value={tags}
                    onChange={ ( tokens ) => {
                        setAttributes({ query:{ ...query, tags: tokens } });
                    }}
                />
                <TextControl
                    type="number"
                    label="Number of posts"
                    value={ per_page }
                    onChange={ ( per_page ) => setAttributes({ query:{ ...query, per_page:per_page } }) }
                />
                <TextControl
                    type="number"
                    label="Offset"
                    value={ offset }
                    onChange={ ( offset ) => setAttributes({ query:{ ...query, offset:offset } }) }
                />
            </PanelBody>
        </Panel>
    )
}