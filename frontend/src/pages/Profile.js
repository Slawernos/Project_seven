import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { deleteUser } from "../elements/FetchCalls";
import { useNavigate } from "react-router-dom";


export default function ProfilePage(props) {
    const navigate = useNavigate();
    const deleteProfile = () => {
        if (window.confirm("Are you sure?"))
            deleteUser(props.auth.token).then((result) => {
                alert("user deleted");
                navigate('/');
                localStorage.clear();

            }).catch((result) => {
                alert("Error!:" + result);
            })
    }

    return (


        <div>


            <Box sx={{

                padding: '25px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                maxWidth: '200px',
                margin: 'auto'
            }}>
                <Typography sx={{
                    textAlign: 'center',
                    marginBottom: '25px'
                }}> User profile Page</Typography>
                <Typography sx={{
                    textAlign: 'center',
                    marginBottom: '25px'
                }}>Username: {props.auth.username}</Typography>

                <Button color='error' variant='contained' onClick={deleteProfile}> Delete Profile </Button>
            </Box>


        </div>
    )
}