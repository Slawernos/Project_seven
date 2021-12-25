import { ReactiveCard } from './Card';
import React from 'react';

function PostsList(props) {
    try {
        if (props.posts !== null) {

            return (
                props.posts.map(singlePost =>


                    <ReactiveCard

                        title={singlePost.title}
                        content={singlePost.content}
                        author={"Posted by: " + singlePost.userid}
                        date={singlePost.date}
                        key={singlePost.postid}
                    />


                )

            )
        }

        else
            return (<div>Loading posts</div>)
    }
    catch (err) {
        return (<div>Error loading posts try to refresh</div>)
    }
}


export default PostsList;