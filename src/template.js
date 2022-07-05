
import Post from './components/post';
import PostIsLoading from './post-loading';

export default function Template({ attributes, posts, isLoading, setAttributes }) {

    const { columns, gridGap, layout, query:{per_page}, template, textAlignment } = attributes;
    
    if (posts == null) {
        return(
            <div 
                className={`template-${template} ${layout} ${textAlignment} ${isLoading} ${( layout == 'columns') ? `columns-${columns}` : ''}`}
                style={{gridColumnGap:gridGap}}
            >
                {
                    Array.from(Array(per_page).keys()).map((post)=>{
                        return <PostIsLoading { ...{attributes,post,isLoading} }/>
                    })
                }
            </div>
        )
    }

    return (
        <div 
            className={`template-${template} ${layout} ${textAlignment} ${isLoading} ${( layout == 'columns') ? `columns-${columns}` : ''}`}
            style={{gridColumnGap:gridGap}}
        >
            {
                posts.map( ( post, index ) => {
                    return <Post { ...{attributes,post,index,isLoading,setAttributes} }/>
                })
            }
        </div>
    )
}
