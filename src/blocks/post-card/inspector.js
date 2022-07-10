/**
 * Wordpress dependecies.
 *
 */
 import { __ } from '@wordpress/i18n';
 import {
     Panel,
     PanelBody,
     ToggleControl,
     __experimentalToggleGroupControl as ToggleGroupControl,
     __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon
 } from '@wordpress/components';
 import {
     pullLeft,
     pullRight,
     alignNone
 } from '@wordpress/icons';
 
 import { ImageSizeSelectControl, FontSizeControl, PostAuthorControls } from '../../components';
 
 export default function PostPanel({ attributes, setAttributes, context }) {
    const {
        categorySettings,
        excerptSettings,
        edits,
        index,
        metaSettings,
        thumbnailSettings,
        titleFontSize
    } = attributes;
    const { 
        layout
    } = context;
     return (
         <Panel>
             <PanelBody title="Post thumbnail settings:" initialOpen={false} >
                 <ToggleControl
                     label="Show post thumbnail"
                     checked={thumbnailSettings.show}
                     onChange={(checked) => {
                         setAttributes({ thumbnailSettings: { ...thumbnailSettings, show: checked } });
                     }}
                 />
 
                 {layout == 'list' && (
                     <ToggleGroupControl
                         label={'Thumbnail alignment'}
                         onChange={(alignment) => {
                             setAttributes({ thumbnailSettings: { ...thumbnailSettings, alignment: alignment } })
                         }}
                         value={thumbnailSettings.alignment}>
                         <ToggleGroupControlOptionIcon value="left" aria-label="Left" icon={pullLeft} showTooltip={true} />
                         <ToggleGroupControlOptionIcon value="" aria-label="None" icon={alignNone} showTooltip={true} />
                         <ToggleGroupControlOptionIcon value="right" aria-label="Right" icon={pullRight} showTooltip={true} />
                     </ToggleGroupControl>
                 )}
 
                 <ImageSizeSelectControl
                     size={thumbnailSettings.size}
                     setSize={(newSize) => {
                         setAttributes({ thumbnailSettings: { ...thumbnailSettings, size: newSize } })
                     }}
                 />
             </PanelBody>
             <PanelBody title="Post title settings:" initialOpen={false}>
                 <FontSizeControl
                     value={titleFontSize}
                     fallbackFontSize={22}
                     onChange={(fontSize) => {
                         setAttributes({ titleFontSize: fontSize });
                     }}
                     withSlider={false}
                     withReset={true}
                 />
             </PanelBody>
             <PanelBody title="Post content settings:" initialOpen={false}>
                 <ToggleControl
                     label="Display excerpt"
                     checked={excerptSettings.show}
                     onChange={(checked) => {
                         setAttributes({ excerptSettings: { ...excerptSettings, show: checked } });
                     }}
                 />
             </PanelBody>
             <PanelBody title="Post meta settings:" initialOpen={false}>
                 <PostAuthorControls {...{ attributes, setAttributes }} />
                 <ToggleControl
                     label="Display date"
                     checked={metaSettings.date.show}
                     onChange={(checked) => {
                         setAttributes({ metaSettings: { ...metaSettings, date:{ show: checked} } });
                     }}
                 />
                 <ToggleControl
                     label="Display categories"
                     checked={categorySettings.showCategories}
                     onChange={(checked) => {
                         setAttributes({ categorySettings: { ...categorySettings, showCategories: checked } });
                     }}
                 />
             </PanelBody>
         </Panel>
     )
 }