import { ReactiveCard } from './Card';
import React from 'react';

function PostsList(props) {

    try {
        if (props.posts !== null) {

            return (
                props.posts.map(singlePost =>


                    <ReactiveCard
                        editPost={props.editPost}
                        title={singlePost.title}
                        author={singlePost.userid}
                        date={singlePost.date}
                        key={singlePost.postid}
                        id={singlePost.postid}
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