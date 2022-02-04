import { Container } from "@mui/material";
import ThemeComponent from "../theme/Theme";
import { Typography } from "@mui/material";

const footerLogo = require('./icon-above-font.svg').default
const logoStyle = {
    height: '50px',
    transform: 'scale(150%)',
    marginRight: '30px'
}
function FooterComponent() {

    return (
        <ThemeComponent>


            <Container disableGutters sx={{
                backgroundColor: 'primary.main',
                width: '100%',
                height: '100px',
                padding: '30px',
                color: 'secondary.main',
                position: 'fixed',
                bottom: '0',
                maxWidth: 'none !important'


            }}>

                <img src={footerLogo} style={logoStyle} alt="Groupomania"></img>
                <Typography
                    sx={{ display: 'inline' }}
                >All rights reserved.</Typography>
            </Container >

        </ThemeComponent>



    );


}


export default FooterComponent;