import React, { useContext } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Paper } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import 'emoji-mart/css/emoji-mart.css'
import classes from './image.modules.css'
import { useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ThemeComponent from '../theme/Theme';
import { EditPostContext, UpdatedContext } from '../elements/PostsContext';
var ipAddress = "http://" + window.location.toString().split("://")[1].split(":")[0];
const style = {
    position: 'fixed',
    top: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '90%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    padding: '15px'
};

export default function ViewEditPost(props) {
    const [isUpdated, setIsUpdated] = useContext(UpdatedContext);
    const [open, setOpen] = React.useState(props.modalState);
    const [editPost, setEditPost] = useContext(EditPostContext);
    React.useEffect(() => {
        setOpen(props.modalState);
    }, [props.modalState]);
    const [textFieldRef, titleFieldRef, fileRef, imageRef, disabledImageRef] = [useRef(), useRef(), useRef(), useRef(), useRef()];


    function deletePost() {
        let getUrl = new URL(ipAddress + ':5050/api/posts');
        getUrl.searchParams.append('id', editPost.postid);
        let postRequest = new Request(getUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': props.token.token,
            },


        });
        fetch(postRequest).then((response) => {
            response.text().then((answer) => {
                if (answer.status === 401)
                    window.location = '/'
                else {
                    setIsUpdated(isUpdated + 1);
                    props.modalHandler();
                }
            })

        });

    }
    const imageUpdater = (elem) => {
        elem.target.addEventListener('change', (src) => {
            var reader = new FileReader();
            reader.onload = function (e) {

                if (disabledImageRef.current) {
                    disabledImageRef.current.src = e.target.result;
                    disabledImageRef.current.parentNode.style.visibility = 'visible';
                    disabledImageRef.current.parentNode.style.height = '200px'
                }
                else
                    imageRef.current.src = e.target.result;
            }
            reader.readAsDataURL(fileRef.current.files[0]);
        })
    }

    function updatePost() {

        if ((titleFieldRef.current.value === "") || (textFieldRef.current.value === ""))
            alert('Empty posts not allowed!');

        else {
            try {
                var formData = new FormData();
                formData.append('post', JSON.stringify({

                    title: titleFieldRef.current.value,
                    post: textFieldRef.current.value,
                    id: editPost.postid,
                    userid: editPost.userid


                }));
                if (fileRef.current.value) {

                    formData.append("image", fileRef.current.files[0])
                }
            }

            catch (err) {
                console.log(err)
            }
            let postRequest = new Request(ipAddress + ':5050/api/posts', {
                method: 'PUT',
                headers: {
                    'Authorization': props.token.token,
                },
                body: formData
            });

            fetch(postRequest).then((response) => {
                if (response.status === 401)
                    window.location = '/'
                else {
                    response.text().then((answer) => {
                        setIsUpdated(isUpdated + 1);
                        setOpen(false);
                    })
                }

            });
        }
    }
    React.useEffect(() => {
        if (open) {
            let getUrl = new URL(ipAddress + ':5050/api/posts/getone');
            getUrl.searchParams.append('id', props.editPost.id);
            let postRequest = new Request(getUrl, {
                method: 'GET',
                headers: {
                    'Authorization': props.token.token,
                }


            });

            fetch(postRequest).then((response) => {
                if (response.status === 401)
                    window.location = '/'
                else {
                    response.text().then((answer) => {
                        let tempPost = JSON.parse(answer);
                        tempPost.isread = true;
                        setEditPost(tempPost)
                    })
                }

            });
        }
        else {
            setIsUpdated(isUpdated + 1);
        }
    }, [open])
    if (editPost.userid === props.token.username) {
        return (
            <ThemeComponent>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    disableScrollLock={true}
                    onClose={props.modalHandler}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                        onClick: props.modalHandler
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <Button variant='outlined' onClick={props.modalHandler}
                                sx={{
                                    'position': 'absolute',
                                    'right': '15px'
                                }}>
                                <CloseIcon />
                            </Button>
                            <TextField
                                id="outlined-multiline-flexible"
                                defaultValue={editPost.title}
                                multiline
                                maxRows={1}
                                placeholder='Enter you post here!'
                                sx={{ width: '100%', marginTop: '35px' }}
                                inputRef={titleFieldRef}
                                variant="standard"
                            >
                            </TextField>
                            <TextField
                                id="outlined-multiline-flexible"
                                defaultValue={editPost.content}
                                multiline
                                rows={8}
                                placeholder='Enter you post here!'
                                sx={{ width: '100%', margin: '30px 0 30px 0' }}
                                inputRef={textFieldRef}
                                variant="standard"
                            >
                            </TextField>

                            <Box sx={{
                                display: 'flex', justifyContent: 'space-between'
                            }}>
                                <Button color='secondary' variant='outlined' onClick={updatePost} > Update Post</Button>
                                <Button color='error' variant='outlined' onClick={deletePost} > Delete Post</Button>
                                <input ref={fileRef}
                                    onClick={imageUpdater}
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="raised-button-file"
                                    type="file"
                                />
                                <label htmlFor="raised-button-file">
                                    <Button color='secondary' variant="outlined" component="span">
                                        Change Image
                                    </Button>
                                </label>
                            </Box>
                            {editPost.img === "" ?
                                <Paper
                                    variant="outlined"
                                    sx={{ display: "flex", justifyContent: "center", marginTop: "25px", maxHeight: '200px', visibility: 'hidden' }}
                                >
                                    <img className='img' ref={disabledImageRef} src={editPost.img} alt="Posted image" />
                                </Paper> :
                                <Paper
                                    variant="outlined"
                                    sx={{ display: "flex", justifyContent: "center", marginTop: "25px", height: '200px' }}
                                >
                                    <img className='img' ref={imageRef} src={editPost.img} alt="Posted image" />
                                </Paper>
                            }
                        </Box>

                    </Fade>

                </Modal >
            </ThemeComponent >
        )

    }
    else {
        return (
            <ThemeComponent>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    disableScrollLock={true}
                    onClose={props.modalHandler}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                        onClick: props.modalHandler
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <Button variant='outlined' onClick={props.modalHandler}
                                sx={{
                                    'position': 'absolute',
                                    'right': '15px'
                                }}>
                                <CloseIcon />
                            </Button>
                            <TextField disabled
                                id="outlined-multiline-flexible"
                                value={editPost.title}
                                multiline
                                maxRows={1}
                                placeholder='Enter you post here!'
                                sx={{ width: '100%', marginTop: '35px' }}
                                variant="standard"
                            >
                            </TextField>
                            <TextField disabled
                                id="outlined-multiline-flexible"
                                value={editPost.content}
                                multiline
                                rows={8}
                                placeholder='Enter you post here!'
                                sx={{ width: '100%', margin: '30px 0 30px 0' }}
                                variant="standard"
                            >
                            </TextField>
                            {editPost.img === "" ?
                                <Paper
                                    variant="outlined"
                                    sx={{ display: "flex", justifyContent: "center", marginTop: "25px", maxHeight: '200px', visibility: 'hidden' }}
                                >
                                    <img className='img' ref={disabledImageRef} src={editPost.img} alt="Posted image" />
                                </Paper> :
                                <Paper
                                    variant="outlined"
                                    sx={{ display: "flex", justifyContent: "center", marginTop: "25px", height: '200px' }}
                                >
                                    <img className='img' ref={imageRef} src={editPost.img} alt="Posted image" />
                                </Paper>
                            }
                        </Box>

                    </Fade>

                </Modal >
            </ThemeComponent >
        )
    }
}