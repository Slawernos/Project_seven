import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { useRef } from 'react';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';


const style = {
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -20%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AddPost(props) {
    const [open, setOpen] = React.useState(props.modalState);
    React.useEffect(() => {
        setOpen(props.modalState);
        setEmoji(false);
    }, [props.modalState]);
    const [textFieldRef, titleFieldRef, fileRef] = [useRef(), useRef(), useRef()];
    const [emoji, setEmoji] = React.useState("");
    const [emojiPickerPos, setEmojiPickerPos] = React.useState({ left: 0, top: 0 });

    function showEmojiPicker(event) {
        setEmoji(true);
        setEmojiPickerPos({ left: (event.pageX - window.screen.width * 0.15), top: (event.pageY - 200) });

    }
    function closeEmojiPicker(event) {
        if (emoji)
            setEmoji(false);

    }

    function pickEmoji(picked) {
        textFieldRef.current.value += picked.native;
    }



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
            props.loading();
            props.modalHandler();
            let postRequest = new Request('http://localhost:5050/api/posts', {
                method: 'POST',
                headers: {
                    'Authorization': props.token.token,
                },
                body: formData
            });

            fetch(postRequest).then((response) => {
                console.log(response)
                response.text().then((answer) => {

                    console.log(answer)

                    props.endLoading();
                    props.updateList();
                })

            });
        }
    }
    return (
        <div>
            {/* disableBackdropClick disableEscapeKeyDown */}
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
                    <Box sx={style} onClick={closeEmojiPicker}>
                        <Typography variant="h6">Enter your Post here!</Typography>
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
                            <Button color='primary' variant='outlined' onClick={sendPost} > Send Post</Button>
                            <input ref={fileRef}
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="raised-button-file"
                                type="file"
                            />
                            <label htmlFor="raised-button-file">
                                <Button variant="outlined" component="span">
                                    Upload Image
                                </Button>
                            </label>
                            <Button size="small" onClick={showEmojiPicker}><SentimentSatisfiedIcon></SentimentSatisfiedIcon></Button>
                        </Box>

                    </Box>

                </Fade>

            </Modal >
            <Box>
                {emoji ? <Picker
                    onSelect={pickEmoji}
                    perLine='6'
                    native='true'
                    style={{ position: 'fixed', zIndex: '9999', width: '80%', maxWidth: '300px', left: emojiPickerPos.left, top: emojiPickerPos.top }}
                /> : ''}
            </Box>
        </div >
    );
}