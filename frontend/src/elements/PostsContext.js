import React, { createContext, useState, useEffect } from 'react'
import { PostCall, RefreshPosts } from './FetchCalls';

export const PostsContext = createContext();
export const EditPostContext = createContext();
export const LoadingContext = createContext();
export const UpdatedContext = createContext();



export function PostsProvider(props) {
    const [isUpdated, setIsUpdated] = useState(0);
    const [backdropHandler, setBackdropHandler] = useState(false);
    const [posts, setPosts] = useState();
    const [editPost, setEditPost] = useState({ "content": "", "date": "", "title": "", "img": "" });
    useEffect(() => {
        if (posts)
            RefreshPosts(props.auth.token, posts).then((result) => {
                setPosts(result)
            }).catch((result) => {
                if (window.confirm(result)) {
                    window.location = '/';
                };

            });
        else
            PostCall(props.auth.token).then((result) => {
                setPosts(result)
            }).catch((result) => {
                if (window.confirm(result)) {
                    window.location = '/';
                };

            });

        // setEditPost(request);
    }, [isUpdated])

    return (

        <LoadingContext.Provider value={[backdropHandler, setBackdropHandler]}>
            <UpdatedContext.Provider value={[isUpdated, setIsUpdated]}>
                <PostsContext.Provider value={[posts, setPosts]}>
                    <EditPostContext.Provider value={[editPost, setEditPost]}>
                        {props.children}
                    </EditPostContext.Provider>
                </PostsContext.Provider>
            </UpdatedContext.Provider>
        </LoadingContext.Provider>


    )
}