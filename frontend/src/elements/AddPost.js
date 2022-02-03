import React, { useState, useContext } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useRef } from 'react';
import { Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ThemeComponent from '../theme/Theme';
import { UpdatedContext } from './PostsContext';
var ipAddress = "http://" + window.location.toString().split("://")[1].split(":")[0];

const style = {
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AddPost(props) {
    const [open, setOpen] = useState(props.modalState);
    const [isUpdated, setIsUpdated] = useContext(UpdatedContext);
    React.useEffect(() => {
        setOpen(props.modalState);
    }, [props.modalState]);
    const [textFieldRef, titleFieldRef, fileRef, imageRef] = [useRef(), useRef(), useRef(), useRef()];

    function sendPost() {

        if ((titleFieldRef.current.value === "") || (textFieldRef.current.value === ""))
            alert('Empty posts not allowed!');

        else {
            try {
                var formData = new FormData();
                formData.append('post', JSON.stringify({

                    title: titleFieldRef.current.value,
                    post: textFieldRef.current.value


                }));
                if (fileRef.current.value) {

                    formData.append("image", fileRef.current.files[0])
                }
            }

            catch (err) {
                console.log(err)
            }
            let postRequest = new Request(ipAddress + ':5050/api/posts', {
                method: 'POST',
                headers: {
                    'Authorization': props.token.token,
                },
                body: formData
            });

            fetch(postRequest).then((response) => {
                response.text().then((answer) => {
                    setIsUpdated(isUpdated + 1);
                    props.modalHandler()

                })

            });
        }
    }
    const imageUpdater = (elem) => {
        elem.target.addEventListener('change', (src) => {
            imageRef.current.src = fileRef.current.value;
            var reader = new FileReader();

            reader.onload = function (e) {
                imageRef.current.src = e.target.result;
                imageRef.current.parentNode.style.visibility = 'visible';
                imageRef.current.parentNode.style.height = '200px'
            }
            reader.readAsDataURL(fileRef.current.files[0]);
        })
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
                                <CloseIcon

                                />
                            </Button>
                            <Typography variant="h6">Add new Post</Typography>

                            <Typography variant="h6" sx={{ marginTop: '15px' }}>Title of your post:</Typography>
                            <TextField
                                id="outlined-multiline-flexible"

                                multiline
                                maxRows={1}
                                placeholder='Enter you post here!'
                                sx={{ width: '100%' }}
                                inputRef={titleFieldRef}
                            />

                            <TextField
                                id="outlined-multiline-flexible"

                                multiline
                                rows={4}
                                placeholder='Enter you post here!'
                                sx={{ width: '100%', margin: '30px 0 30px 0' }}
                                inputRef={textFieldRef}
                            >



                            </TextField>


                            <Box sx={{
                                display: 'flex', justifyContent: 'space-between'
                            }}>
                                <Button color='secondary' variant='outlined' onClick={sendPost} > Send Post</Button>
                                <input ref={fileRef}
                                    onClick={imageUpdater}
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="raised-button-file"
                                    type="file"
                                />
                                <label htmlFor="raised-button-file">
                                    <Button variant="outlined" color='secondary' component="span">
                                        Upload Image
                                    </Button>
                                </label>

                            </Box>
                            <Paper
                                variant="outlined"
                                sx={{ display: "flex", justifyContent: "center", marginTop: "25px", maxHeight: '200px', visibility: 'hidden' }}
                            >
                                <img className='img' ref={imageRef} />
                            </Paper>
                        </Box>

                    </Fade>

                </Modal >
            </ThemeComponent>
        </div >
    );




}