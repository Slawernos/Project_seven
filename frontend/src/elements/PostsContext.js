import React, { createContext, useState, useEffect } from 'react'
import { PostCall, RefreshPosts } from './FetchCalls';

export const PostsContext = createContext();
export const EditPostContext = createContext();
export const LoadingContext = createContext();
export const UpdatedContext = createContext();



export function PostsProvider(props) {
    const [isUpdated, setIsUpdated] = useState(false);
    const [backdropHandler, setBackdropHandler] = useState(false);
    const [posts, setPosts] = useState();
    const [editPost, setEditPost] = useState({ "content": "", "date": "", "title": "", "img": "" });
    useEffect(() => {
        if (!isUpdated) {
            if (posts) {
                RefreshPosts(props.auth.token, posts).then((result) => {
                    setPosts(() => {

                        if (result.length !== 0)
                            return result;
                        else
                            PostCall(props.auth.token).then((result) => {
                                return result;
                            }).catch((result) => {
                                if (window.confirm(result)) {
                                    window.location = '/';
                                };

                            });
                    })
                    setIsUpdated(true);
                }).catch((result) => {
                    if (window.confirm(result)) {
                        window.location = '/';
                    };

                });

            }
            else
                PostCall(props.auth.token).then((result) => {
                    setPosts(() => {

                        setIsUpdated(true);
                        return result;
                    })
                }).catch((result) => {
                    if (window.confirm(result)) {
                        window.location = '/';
                    };

                });
        }

    }, [isUpdated, props.auth.token, posts])

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