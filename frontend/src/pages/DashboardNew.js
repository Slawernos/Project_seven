import React, { useState } from 'react';
import Container from '@mui/material/Container'
import ButtonPair from '../elements/Buttonpair';
import PostsList from '../elements/PostsList';
import { Add as AddIcon } from '@mui/icons-material';
import { Fab } from '@mui/material';
import AddPost from '../elements/AddPost';
import { Box } from '@mui/system';
import ViewEditPost from '../elements/ViewEditPost';
import { PostsProvider } from '../elements/PostsContext'


function Dashboard(props) {
    const [addPostModal, setAddPostModal] = useState(false);
    const [editPostModal, seteditPostModal] = useState(false);
    const [isEditPost, setisEditPost] = useState(false);

    const modalHandler = () => {
        if (addPostModal)
            setAddPostModal(false);
        else
            setAddPostModal(true);
    }
    const editPostHandler = (post) => {
        if (editPostModal) {
            seteditPostModal(false);
        }
        else {
            setisEditPost(post);
            seteditPostModal(true);
        }

    }

    return (
        <PostsProvider auth={props.auth}>
            <Container sx={{ padding: '25px', position: 'relative' }} >
                <Fab onClick={modalHandler} backgroundcolor="primary" aria-label="Add new post" sx={{
                    position: 'absolute',
                    right: '30px',
                    top: '20px'
                }} >

                    <AddIcon />
                </Fab>
                <AddPost token={props.auth} modalHandler={modalHandler} modalState={addPostModal} />
                <ViewEditPost editPost={isEditPost} token={props.auth} modalHandler={editPostHandler} modalState={editPostModal} />

                <h3>All posts:</h3>
                <PostsList editPost={editPostHandler} />
                <Box>
                    <ButtonPair auth={props.auth}></ButtonPair>
                </Box>

            </Container>
        </PostsProvider>

    )



}



export default Dashboard;