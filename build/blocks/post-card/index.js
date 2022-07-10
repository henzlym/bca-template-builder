(()=>{"use strict";var e,t={22:(e,t,a)=>{a.d(t,{Z:()=>r});var n=a(307),o=a(444);const r=(0,n.createElement)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,n.createElement)(o.Path,{d:"M5 15h14V9H5v6zm0 4.8h14v-1.5H5v1.5zM5 4.2v1.5h14V4.2H5z"}))},341:(e,t,a)=>{a.d(t,{Z:()=>r});var n=a(307),o=a(444);const r=(0,n.createElement)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,n.createElement)(o.Path,{d:"M4 18h6V6H4v12zm9-9.5V10h7V8.5h-7zm0 7h7V14h-7v1.5z"}))},239:(e,t,a)=>{a.d(t,{Z:()=>r});var n=a(307),o=a(444);const r=(0,n.createElement)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,n.createElement)(o.Path,{d:"M14 6v12h6V6h-6zM4 10h7V8.5H4V10zm0 5.5h7V14H4v1.5z"}))},616:(e,t,a)=>{var n=a(981),o=a(307),r=(a(736),a(819),a(771)),l=a(609),s=a(196),i=a(175),c=a(225),d=a(341),u=a(22),m=a(239),h=a(798);function p(e){let{attributes:t,setAttributes:a,context:n}=e;const{categorySettings:r,excerptSettings:s,edits:i,index:c,metaSettings:p,thumbnailSettings:g,titleFontSize:b}=t,{layout:w}=n;return(0,o.createElement)(l.Panel,null,(0,o.createElement)(l.PanelBody,{title:"Post thumbnail settings:",initialOpen:!1},(0,o.createElement)(l.ToggleControl,{label:"Show post thumbnail",checked:g.show,onChange:e=>{a({thumbnailSettings:{...g,show:e}})}}),"list"==w&&(0,o.createElement)(l.__experimentalToggleGroupControl,{label:"Thumbnail alignment",onChange:e=>{a({thumbnailSettings:{...g,alignment:e}})},value:g.alignment},(0,o.createElement)(l.__experimentalToggleGroupControlOptionIcon,{value:"left","aria-label":"Left",icon:d.Z,showTooltip:!0}),(0,o.createElement)(l.__experimentalToggleGroupControlOptionIcon,{value:"","aria-label":"None",icon:u.Z,showTooltip:!0}),(0,o.createElement)(l.__experimentalToggleGroupControlOptionIcon,{value:"right","aria-label":"Right",icon:m.Z,showTooltip:!0})),(0,o.createElement)(h.Yo,{size:g.size,setSize:e=>{a({thumbnailSettings:{...g,size:e}})}})),(0,o.createElement)(l.PanelBody,{title:"Post title settings:",initialOpen:!1},(0,o.createElement)(h.TA,{value:b,fallbackFontSize:22,onChange:e=>{a({titleFontSize:e})},withSlider:!1,withReset:!0})),(0,o.createElement)(l.PanelBody,{title:"Post content settings:",initialOpen:!1},(0,o.createElement)(l.ToggleControl,{label:"Display excerpt",checked:s.show,onChange:e=>{a({excerptSettings:{...s,show:e}})}})),(0,o.createElement)(l.PanelBody,{title:"Post meta settings:",initialOpen:!1},(0,o.createElement)(h.ao,{attributes:t,setAttributes:a}),(0,o.createElement)(l.ToggleControl,{label:"Display date",checked:p.date.show,onChange:e=>{a({metaSettings:{...p,date:{show:e}}})}}),(0,o.createElement)(l.ToggleControl,{label:"Display categories",checked:r.showCategories,onChange:e=>{a({categorySettings:{...r,showCategories:e}})}})))}const g=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"bca/post-card","version":"0.1.0","title":"Post Card","category":"widgets","icon":"layout","description":"Select post card.","attributes":{"categorySettings":{"type":"object","default":{"show":true}},"excerptSettings":{"type":"object","default":{"show":true}},"edits":{"type":"object","default":{}},"index":{"type":"number"},"metaSettings":{"type":"object","default":{"author":{"show":true,"showIcon":false},"date":{"showDate":true}}},"titleFontSize":{"type":"string","default":"22px"},"thumbnailSettings":{"type":"object","default":{"show":true,"alignment":"","size":"thumbnail"}}},"supports":{"anchor":true,"align":true,"className":true,"color":{"background":true,"link":true,"text":true},"html":false,"spacing":{"margin":true,"padding":true,"blockGap":true}},"usesContext":["bca-template-builder/query","bca-template-builder/postSettings","posts","isLoading","layout"],"textdomain":"bca-post-card","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');(0,n.registerBlockType)(g,{edit:function(e){let{attributes:t,context:a,setAttributes:n}=e;const{categorySettings:d,excerptSettings:u,edits:m,index:h,metaSettings:g,thumbnailSettings:b,titleFontSize:w}=t,{"bca-template-builder/query":v,isLoading:S,posts:x,layout:E}=a,[_,f]=((0,o.useRef)(!0),(0,o.useState)(x[h])),{date:y,id:z,excerpt:{rendered:C},title:{raw:k}}=_,[P,O]=(0,o.useState)(!1),T=(0,o.useMemo)((()=>{let e=b.size;return(0,c.sX)(_,e)}),[b.size]),N=(0,o.useMemo)((()=>(0,c.Au)(_)),[_.author]),A=(0,o.useMemo)((()=>(0,c.CP)(_)),[_.categories]),F=(0,o.useMemo)((()=>{if(!C)return"";const e=(new window.DOMParser).parseFromString(C,"text/html");return e.body.textContent||e.body.innerText||""}),[C]);0==h&&console.log(_);let V=(0,i.useBlockProps)({className:`bca-card ${b.alignment} ${S?"is-loading":""}`});return(0,o.createElement)("div",V,(0,o.createElement)(PostEdit,{attributes:t,setAttributes:n}),(0,o.createElement)(i.InspectorControls,null,(0,o.createElement)(p,{attributes:t,setAttributes:n,context:a})),(0,o.createElement)(l.Animate,{type:!P||S?"loading":""},(e=>{let{className:t}=e;return(0,o.createElement)(s.Fragment,null,T&&b.show&&(0,o.createElement)("div",{className:`bca-card_thumbnail_container ${P?"":"is-loading"} ${t}`},(0,o.createElement)("img",{className:"bca-card_thumbnail",src:T,onLoad:e=>{O(!0)}})))})),(0,o.createElement)(l.Animate,{type:S?"loading":""},(e=>{let{className:t}=e;return(0,o.createElement)("div",{className:`bca-card_headline ${t}`},!S&&(0,o.createElement)(s.Fragment,null,A&&d.show&&(0,o.createElement)("span",{className:"bca-card_categories"},A.map((e=>(0,o.createElement)("a",{rel:"category tag"},e)))),(0,o.createElement)("h2",{className:"bca-card_title",style:{fontSize:w}},k),(0,o.createElement)("div",{className:"bca-card_byline stacked"},!1!==N&&g.author.show&&(0,o.createElement)("address",{className:"bca-card_author"},!g.author.showIcon&&(0,o.createElement)("span",{className:"bca-card_author_prefix"},"By"),(0,o.createElement)("a",{href:N.link,rel:"author"},g.author.showIcon&&(0,o.createElement)("img",{className:"bca-card_author_avatar",src:N.avatar}),(0,o.createElement)("span",{className:"bca-card_author_name"},N.name))),g.date.show&&(0,o.createElement)("time",null,(0,r.dateI18n)("F j, Y",y))),u.show&&(0,o.createElement)("div",{className:"bca-card_excerpt"},F)))})))}})},798:(e,t,a)=>{a.d(t,{TA:()=>s,Yo:()=>i,ao:()=>d});var n=a(307),o=a(819),r=(a(736),a(818)),l=a(609);function s(e){let{value:t,fallbackFontSize:a=16,onChange:s=null,withSlider:i=!1,withReset:c=!0}=e;const{fontSizes:d}=(0,r.useSelect)((e=>{const{getSettings:t}=e("core/block-editor");return console.log(t()),(0,o.pick)(t(),["fontSizes"])}));return 0==d.length?null:(0,n.createElement)(l.FontSizePicker,{fontSizes:d,value:t,fallbackFontSize:a,onChange:s,withSlider:i,withReset:c})}function i(e){let{size:t,setSize:a}=e;const{imageSizes:s}=(0,r.useSelect)((e=>{const{getSettings:t}=e("core/block-editor");return(0,o.pick)(t(),["imageSizes"])}));if(0==s.length)return null;const i=s.map((e=>({label:e.name,value:e.slug})));return(0,n.createElement)(l.SelectControl,{label:"Image size",value:t,options:i,onChange:a,__nextHasNoMarginBottom:!0})}var c=a(196);function d(e){const{attributes:{postSettings:t},setAttributes:a}=e;return(0,n.createElement)(c.Fragment,null,(0,n.createElement)(l.ToggleControl,{label:"Display author",checked:t.showAuthor,onChange:e=>{a({postSettings:{...t,showAuthor:e}})}}),t.showAuthor&&(0,n.createElement)(l.ToggleControl,{label:"Display author icon",checked:t.showAuthorIcon,onChange:e=>{a({postSettings:{...t,showAuthorIcon:e}})}}))}a(333),a(771),a(225),a(989),a(483)},225:(e,t,a)=>{a.d(t,{Au:()=>o,CP:()=>l,sX:()=>r}),a(989),a(483);var n=a(819);function o(e){const t=void 0!==e._embedded.author&&e._embedded.author[0];return!1!==t&&(t.avatar=!1,void 0!==e._embedded.author[0].avatar_urls[48]?t.avatar=e._embedded.author[0].avatar_urls[48]:void 0!==e._embedded.author[0].avatar_urls[24]?t.avatar=e._embedded.author[0].avatar_urls[24]:void 0!==e._embedded.author[0].avatar_urls[96]&&(t.avatar=e._embedded.author[0].avatar_urls[96])),t}function r(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"thumbnail";const a=void 0!==e._embedded["wp:featuredmedia"]&&e._embedded["wp:featuredmedia"][0];return a?(0,n.get)(a,["media_details","sizes",t,"source_url"]):a}function l(e){const t=void 0!==e._embedded["wp:term"]&&e._embedded["wp:term"][0];return t?t.map((e=>e.name)):t}},196:e=>{e.exports=window.React},819:e=>{e.exports=window.lodash},989:e=>{e.exports=window.wp.apiFetch},175:e=>{e.exports=window.wp.blockEditor},981:e=>{e.exports=window.wp.blocks},609:e=>{e.exports=window.wp.components},333:e=>{e.exports=window.wp.compose},818:e=>{e.exports=window.wp.data},771:e=>{e.exports=window.wp.date},307:e=>{e.exports=window.wp.element},736:e=>{e.exports=window.wp.i18n},444:e=>{e.exports=window.wp.primitives},483:e=>{e.exports=window.wp.url}},a={};function n(e){var o=a[e];if(void 0!==o)return o.exports;var r=a[e]={exports:{}};return t[e](r,r.exports,n),r.exports}n.m=t,e=[],n.O=(t,a,o,r)=>{if(!a){var l=1/0;for(d=0;d<e.length;d++){for(var[a,o,r]=e[d],s=!0,i=0;i<a.length;i++)(!1&r||l>=r)&&Object.keys(n.O).every((e=>n.O[e](a[i])))?a.splice(i--,1):(s=!1,r<l&&(l=r));if(s){e.splice(d--,1);var c=o();void 0!==c&&(t=c)}}return t}r=r||0;for(var d=e.length;d>0&&e[d-1][2]>r;d--)e[d]=e[d-1];e[d]=[a,o,r]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={465:0,431:0};n.O.j=t=>0===e[t];var t=(t,a)=>{var o,r,[l,s,i]=a,c=0;if(l.some((t=>0!==e[t]))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(i)var d=i(n)}for(t&&t(a);c<l.length;c++)r=l[c],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(d)},a=globalThis.webpackChunkbca_template_builder=globalThis.webpackChunkbca_template_builder||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var o=n.O(void 0,[431],(()=>n(616)));o=n.O(o)})();