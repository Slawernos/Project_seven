import { ReactiveCard } from './Card';

function PostsList(props) {
    if (props.posts !== null) {

        return (
            props.posts.map(singlePost =>


                <ReactiveCard
                    title={singlePost.title}
                    content={singlePost.content}
                    author={"Posted by: " + singlePost.userid}
                    authorMessage={"Post created at:" + singlePost.date}
                    key={singlePost.postid}
                />


            )
        )
    }
    else
        return (<div>Loading posts</div>)
}


export default PostsList;