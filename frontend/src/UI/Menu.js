import * as React from 'react';
import Button from '@mui/material/Button';
import { Container, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import ThemeComponent from '../theme/Theme'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useRef, useState } from 'react';
import { SwipeableDrawer } from '@mui/material';
import { ListItemText, ListItemIcon, IconButton } from '@mui/material/';
import { AccountBox as AccountBoxIcon, Dashboard as DashboardIcon, Home as HomeIcon, Logout as LogoutIcon, Menu as MenuIcon, Info as InfoIcon, Scale } from '@mui/icons-material/';

const logo = require('./icon-left-font.svg').default;

const logoStyle = {
    height: '80px',
    transform: 'scale(200%)'
}
export default function BasicMenu(props) {
    const [open, setOpen] = useState(false);
    const handleDrawer = (event) => {

        setOpen(true);
    };
    const closeDrawer = (event) => {

        setOpen(false);
    };
    const inputEl = useRef(null);
    return (

        <ThemeComponent>


            <Container disableGutters maxWidth="false"
                sx={{
                    bgcolor: "secondary.main",
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',

                }}>
                <AppBar position="static">
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <IconButton ref={inputEl} onClick={handleDrawer}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{
                                mr: 2,
                                display: props.auth.token == null ? 'none' : '-webkit-box',

                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <img style={logoStyle} src={logo}></img>
                        <Button color="inherit" component={Link} onClick={props.logout} sx={{ display: props.auth.token == null ? 'none' : 'unset' }} to='/login'>Logout</Button>
                    </Toolbar>
                </AppBar>
                <SwipeableDrawer
                    anchor="left"
                    open={open}
                    onClose={() => setOpen(false)}
                    onOpen={() => { }}
                >
                    <Button color="inherit" component={Link} to='/' onClick={closeDrawer}>
                        <ListItem>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText>Home</ListItemText>
                        </ListItem>
                    </Button>

                    <Button color="inherit" component={Link} to='/dashboard' onClick={closeDrawer}>
                        <ListItem>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText>Posts</ListItemText>
                        </ListItem>
                    </Button>
                    <Button color="inherit" component={Link} to='/profile' onClick={closeDrawer}>
                        <ListItem>
                            <ListItemIcon>
                                <AccountBoxIcon />
                            </ListItemIcon>
                            <ListItemText>Profile</ListItemText>
                        </ListItem>
                    </Button>
                    <Button color="inherit" component={Link} to='/about' onClick={closeDrawer}>
                        <ListItem>
                            <ListItemIcon>
                                <InfoIcon />
                            </ListItemIcon>
                            <ListItemText>About</ListItemText>
                        </ListItem>
                    </Button>
                    <Button color="inherit" component={Link} to='/logout' onClick={props.logout}>
                        <ListItem>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText>Logout</ListItemText>
                        </ListItem>
                    </Button>

                </SwipeableDrawer>

            </Container>
        </ThemeComponent >


    );
}