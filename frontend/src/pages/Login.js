import { Container } from '@mui/material/'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import { useRef } from "react";
import { Link } from 'react-router-dom';
import * as React from 'react';

var ipAddress = "http://" + window.location.toString().split("://")[1].split(":")[0];

function Login(props) {
    var [username, password] = [useRef(), useRef()];
    const loginHandler = (event) => {
        var loginRequest = new Request(ipAddress + ':5050/api/auth/login', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ username: username.current.value, password: password.current.value })
        });

        fetch(loginRequest).then((response) => {
            response.text().then((credentials) => {

                props.login(JSON.parse(credentials).token, JSON.parse(credentials).userId)
            })
        })
    }

    return (

        <div>
            <Container maxWidth="sm" sx={{
                borderRadius: 1,

                padding: '15px',
                margin: 'auto',
            }}>
                <h1>Enter login details below </h1>
                <form autoComplete="off">
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
                        <Button variant="contained" sx={{ color: "primary", margin: '15px' }} onClick={loginHandler}>Login</Button>
                        <Button variant="contained" sx={{ color: "primary", margin: '15px' }} component={Link} to='/register'>Register</Button>
                    </Container>
                </form>

            </Container>
        </div>


    );
}

export default Login;