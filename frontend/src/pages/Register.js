import { Container, Typography } from '@mui/material/'
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useRef } from "react"
import { Link } from 'react-router-dom';
var ipAddress = "http://" + window.location.toString().split("://")[1].split(":")[0];

function Register() {
    var navigate = useNavigate();
    var [username, password] = [useRef(), useRef()];
    const loginHandler = (event) => {

        var loginRequest = new Request(ipAddress + ':5050/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ username: username.current.value, password: password.current.value })
        });

        fetch(loginRequest).then((response) => {
            if (response.status === 500)
                response.text().then((result) => {
                    alert(JSON.parse(result).error)
                })
            else {
                window.confirm('Successfully Registered');
                navigate('/login');

            }
        })
    }

    return (


        <Container maxWidth="sm" sx={{
            borderRadius: 1,

            padding: '15px',
            margin: 'auto',
        }}>
            <h3>Enter user details below to register</h3>
            <form noValidate autoComplete="off">
                <Container sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column'
                }}>
                    <TextField label="Username" inputRef={username}
                        variant="outlined"
                        sx={{ color: "primary.main", margin: '15px' }}
                    ></TextField>
                    <TextField type="password" inputRef={password} label="Password" sx={{ color: "primary.main", margin: '15px' }}
                        variant="outlined"
                        color="primary"
                    ></TextField>

                </Container>
                <Container sx={{
                    marginTop: '50px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column'
                }}>
                    <Button variant="contained" sx={{ color: "primary", margin: '15px' }} onClick={loginHandler}>Register</Button>
                    <Typography variant='h7'>Already registered?</Typography>
                    <Button component={Link} variant="contained" sx={{ color: "primary", margin: '15px' }} to='/login'>Back to Login</Button>
                </Container>
            </form>

        </Container>
    );
}

export default Register;