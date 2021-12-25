import * as React from 'react';
import Container from '@mui/material/Container'
import SimpleBackdrop from '../elements/Simplebackdrop';
import PostsList from '../elements/PostsList';
import { Add as AddIcon } from '@mui/icons-material';
import { Fab } from '@mui/material';
import AddPost from '../elements/AddPost';



function Dashboard(props) {
    var [backdropHandler, setBackdropHandler] = React.useState(false);
    var [postsArray, setPostsArray] = React.useState(null);
    var [addPostModal, setAddPostModal] = React.useState(false);


    const modalHandler = () => {

        if (addPostModal)
            setAddPostModal(false);
        else
            setAddPostModal(true);


    }
    const loadPosts = (posts) => {
        setPostsArray(posts);
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
        var loginRequest = new Request('http://localhost:5050/api/posts/getall', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': token.token
            },
        });


        fetch(loginRequest).then((response) => {
            response.text().then((posts) => {
                var tempArray = JSON.parse(posts)
                loadPosts(tempArray)
                console.log(tempArray);

            })
            closeBackdrop();
        })
    }
    React.useEffect(() => {
        getPosts(props.auth);
    }, [newPost])
    return (

        <Container sx={{ padding: '25px', position: 'relative' }} >
            <Fab onClick={modalHandler} color="primary" aria-label="Add new post" sx={{
                position: 'absolute',
                right: '30px',
                top: '20px'
            }} >

                <AddIcon />
            </Fab>
            <AddPost updateList={updateList} endLoading={closeBackdrop} loading={handleBackdrop} token={props.auth} modalHandler={modalHandler} modalState={addPostModal} />
            <SimpleBackdrop backdropHandler={backdropHandler} />

            <h3>All posts:</h3>
            {
                <PostsList posts={postsArray} />
            }
            {/* {extra post component....} */}

        </Container>
    )



}



export default Dashboard;