import { Container } from '@mui/material/'
import TextField from '@mui/material/TextField'
import ThemeComponent from '../theme/Theme';
import Button from '@mui/material/Button'
import { useRef } from "react"


function Register() {
    var [username, password] = [useRef(), useRef()];
    const loginHandler = (event) => {

        var loginRequest = new Request('http://localhost:5050/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ username: username.current.value, password: password.current.value })
        });

        fetch(loginRequest)
    }

    return (

        <ThemeComponent>
            <Container maxWidth="sm" sx={{
                borderRadius: 1,

                padding: '15px',
                margin: 'auto',
            }}>
                <h1>Enter user details below </h1>
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
                    </Container>
                </form>

            </Container>
        </ThemeComponent >
    );
}

export default Register;