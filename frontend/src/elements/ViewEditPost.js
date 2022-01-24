import * as React from 'react';
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
var ipAddress = "http://" + window.location.toString().split("://")[1].split(":")[0];



const style = {
    position: 'absolute',
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
    const [open, setOpen] = React.useState(props.modalState);
    React.useEffect(() => {
        setOpen(props.modalState);
    }, [props.modalState]);
    const [textFieldRef, titleFieldRef, fileRef, imageRef, disabledImageRef] = [useRef(), useRef(), useRef(), useRef(), useRef()];

    function deletePost() {
        let getUrl = new URL(ipAddress + ':5050/api/posts');
        getUrl.searchParams.append('id', props.postData.postid);
        let postRequest = new Request(getUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': props.token.token,
            },


        });
        fetch(postRequest).then((response) => {
            response.text().then((answer) => {
                if (answer.status == 401)
                    window.location = '/'
                else {
                    props.endLoading();
                    props.updateList();
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
                    id: props.postData.postid,
                    date: props.postData.date,
                    userid: props.postData.userid


                }));
                if (fileRef.current.value) {

                    formData.append("image", fileRef.current.files[0])
                }
            }

            catch (err) {
                console.log(err)
            }
            props.loading();
            props.modalHandler();
            let postRequest = new Request(ipAddress + ':5050/api/posts', {
                method: 'PUT',
                headers: {
                    'Authorization': props.token.token,
                },
                body: formData
            });

            fetch(postRequest).then((response) => {
                if (response.status == 401)
                    window.location = '/'
                else {
                    response.text().then((answer) => {

                        props.endLoading();
                        props.updateList();
                    })
                }

            });
        }
    }

    return (
        <div>
            {/* disableBackdropClick disableEscapeKeyDown */}
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
                            {props.editPost.author === props.token.username ?
                                <TextField
                                    id="outlined-multiline-flexible"
                                    defaultValue={props.postData.title}
                                    multiline
                                    maxRows={1}
                                    placeholder='Enter you post here!'
                                    sx={{ width: '100%', marginTop: '40px' }}
                                    inputRef={titleFieldRef}
                                />
                                :
                                <TextField disabled
                                    id="outlined-multiline-flexible"
                                    value={props.postData.title}
                                    multiline
                                    maxRows={1}
                                    placeholder='Enter you post here!'
                                    sx={{ width: '100%', marginTop: '35px' }}
                                    inputRef={titleFieldRef}
                                    variant="standard"
                                />



                            }
                            {props.editPost.author === props.token.username ?
                                <TextField
                                    id="outlined-multiline-flexible"
                                    defaultValue={props.postData.content}
                                    multiline
                                    rows={4}
                                    placeholder='Enter you post here!'
                                    sx={{ width: '100%', margin: '30px 0 30px 0' }}
                                    inputRef={textFieldRef}
                                >{props.postData.content}


                                </TextField>
                                :
                                <TextField disabled
                                    id="outlined-multiline-flexible"
                                    value={props.postData.content}
                                    multiline
                                    rows={8}
                                    placeholder='Enter you post here!'
                                    sx={{ width: '100%', margin: '30px 0 30px 0' }}
                                    inputRef={textFieldRef}
                                    variant="standard"
                                >
                                </TextField>}

                            {props.editPost.author === props.token.username ? <Box sx={{
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
                            </Box> : ""}
                            {props.postData.img === "" ?
                                <Paper
                                    variant="outlined"
                                    sx={{ display: "flex", justifyContent: "center", marginTop: "25px", maxHeight: '200px', visibility: 'hidden' }}
                                >
                                    <img className='img' ref={disabledImageRef} src={props.postData.img} />
                                </Paper> :
                                <Paper
                                    variant="outlined"
                                    sx={{ display: "flex", justifyContent: "center", marginTop: "25px", height: '200px' }}
                                >
                                    <img className='img' ref={imageRef} src={props.postData.img} />
                                </Paper>
                            }
                        </Box>

                    </Fade>

                </Modal >
            </ThemeComponent >
        </div >

    );




}