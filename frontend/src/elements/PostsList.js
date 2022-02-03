import { ReactiveCard } from './Card';
import React, { useContext } from 'react';
import { PostsContext } from '../elements/PostsContext';

function PostsList(props) {
    const [posts, setPosts] = useContext(PostsContext);
    try {
        if (posts !== null) {

            if (posts.length > 0) {
                return (
                    posts.map(singlePost =>
                        <ReactiveCard
                            editPost={props.editPost}
                            title={singlePost.title}
                            author={singlePost.userid}
                            date={singlePost.date}
                            key={singlePost.postid}
                            id={singlePost.postid}
                            isread={singlePost.isread}
                        />
                    )
                )
            }
            else {
                return (
                    <div>Noposts to present</div>
                )
            }



        }

        else
            return (<div>Loading posts</div>)
    }
    catch (err) {
        return (<div>Error loading posts try to refresh</div>)
    }
}


export default PostsList;