import { Typography } from "@mui/material";
import { Box } from "@mui/system";


const logo = require('../UI/icon-left-font.svg').default;

const logoStyle = {
    height: '150px',
    margin: 'auto',
    display: 'block'
}

export default function About() {


    return (
        <Box>
            <Typography sx={{ width: '100%', textAlign: 'center', padding: '1rem' }} variant="h5">
                Groupomania Forum
            </Typography>
            <img style={logoStyle} src={logo} alt="Groupomania"></img>
            <Typography>
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
            </Typography>
        </Box>


    );
}