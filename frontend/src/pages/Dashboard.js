import * as React from 'react';
import Container from '@mui/material/Container'
import SimpleBackdrop from '../elements/Simplebackdrop';
import PostsList from '../elements/PostsList';
import { Add as AddIcon } from '@mui/icons-material';
import { Button, Fab } from '@mui/material';
import AddPost from '../elements/AddPost';
import { useRef } from 'react';
import { Box } from '@mui/system';
import ViewEditPost from '../elements/ViewEditPost';
import ThemeComponent from '../theme/Theme';

var ipAddress = "http://" + window.location.toString().split("://")[1].split(":")[0];
function Dashboard(props) {

    var [backdropHandler, setBackdropHandler] = React.useState(false);
    var [postsArray, setPostsArray] = React.useState(null);
    var [addPostModal, setAddPostModal] = React.useState(false);
    var [editPostModal, seteditPostModal] = React.useState(false);
    var [isEditPost, setisEditPost] = React.useState(false);
    const [postData, setPostData] = React.useState({ "content": "", "date": "", "title": "", "img": "" })
    const lastPostRef = useRef();


    const loadEditPost = (post) => {
        setPostData(post);
    }
    const getPost = (post) => {

        handleBackdrop();
        let getUrl = new URL(ipAddress + ':5050/api/posts/getone');
        getUrl.searchParams.append('id', post.id);
        let postRequest = new Request(getUrl, {
            method: 'GET',
            headers: {
                'Authorization': props.auth.token,
            }


        });

        fetch(postRequest).then((response) => {
            if (response.status == 401)
                window.location = '/'
            else {
                response.text().then((answer) => {
                    setPostData(JSON.parse(answer)[0])

                })
            }

        });
        closeBackdrop();

    }

    const nextPage = () => {
        handleBackdrop();
        var loginRequest = new Request(ipAddress + ':5050/api/posts/getChunk', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': props.auth.token
            },
            body: JSON.stringify({
                date: postsArray[postsArray.length - 1].date,
                next: true
            })
        });


        fetch(loginRequest).then((response) => {
            if (response.status == 401)
                window.location = '/'
            else {
                response.text().then((posts) => {
                    var tempArray = JSON.parse(posts)
                    loadPosts(tempArray)


                })
            }
            closeBackdrop();
        })
    }
    const postEditor = (post) => {
        setPostData({ "content": "", "date": "", "title": "", "img": "" });
        getPost(post);
        setisEditPost(post);
    }
    const prevPage = () => {
        handleBackdrop();
        var loginRequest = new Request(ipAddress + ':5050/api/posts/getChunk', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': props.auth.token
            },
            body: JSON.stringify({
                date: postsArray[0].date,
                next: false
            })
        });


        fetch(loginRequest).then((response) => {
            if (response.status == 401)
                window.location = '/'
            else {
                response.text().then((posts) => {

                    var tempArray = JSON.parse(posts)
                    loadPosts(tempArray)



                })
            }
            closeBackdrop();
        })
    }


    const modalHandler = () => {

        if (addPostModal)
            setAddPostModal(false);
        else
            setAddPostModal(true);

    }
    const editPostHandler = (post) => {


        if (editPostModal)
            seteditPostModal(false);
        else {

            postEditor(post);
            seteditPostModal(true);

        }

    }



    const loadPosts = (posts) => {

        if (posts.length !== 0) {
            setPostsArray(posts)
        }


    }
    const handleBackdrop = () => {
        setBackdropHandler(true)
    }
    const closeBackdrop = () => {
        setBackdropHandler(false)
    }
    const [newPost, setNewPost] = React.useState(0);
    const updateList = () => {
        setNewPost(newPost + 1)
    }
    const getPosts = (token) => {
        handleBackdrop();
        var loginRequest = new Request(ipAddress + ':5050/api/posts/getall', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': token.token
            },
        });


        fetch(loginRequest).then((response) => {
            if (response.status == 401)
                window.location = '/'
            else {
                response.text().then((posts) => {
                    var tempArray = JSON.parse(posts)
                    loadPosts(tempArray)

                })
            }
            closeBackdrop();
        })
    }
    React.useEffect(() => {
        getPosts(props.auth);

    }, [newPost]);

    return (
        <ThemeComponent>
            <Container sx={{ padding: '25px', position: 'relative' }} >
                <Fab onClick={modalHandler} backgroundcolor="primary" aria-label="Add new post" sx={{
                    position: 'absolute',
                    right: '30px',
                    top: '20px'
                }} >

                    <AddIcon />
                </Fab>
                <AddPost updateList={updateList} endLoading={closeBackdrop} loading={handleBackdrop} token={props.auth} modalHandler={modalHandler} modalState={addPostModal} />
                <ViewEditPost postData={postData} editPost={isEditPost} updateList={updateList} endLoading={closeBackdrop} loading={handleBackdrop} token={props.auth} modalHandler={editPostHandler} modalState={editPostModal} />
                <SimpleBackdrop backdropHandler={backdropHandler} />

                <h3>All posts:</h3>
                <PostsList posts={postsArray} editPost={editPostHandler} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px' }}>
                    <Button ref={lastPostRef} color='secondary' onClick={prevPage}>Load Previous Posts</Button>
                    <Button ref={lastPostRef} color='secondary' onClick={nextPage}>Load Next Posts</Button>
                </Box>

            </Container>
        </ThemeComponent>
    )



}



export default Dashboard;