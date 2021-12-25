import { Container } from "@mui/material";
import ThemeComponent from "../theme/Theme";

function FooterComponent() {

    return (
        <ThemeComponent>


            <Container disableGutters sx={{
                backgroundColor: 'secondary.main',
                width: '100%',
                height: '100px',
                padding: '30px',
                color: 'primary.main',
                position: 'fixed',
                bottom: '0',
                maxWidth: 'none !important'


            }}>

                Footer WIP
            </Container >

        </ThemeComponent>



    );


}


export default FooterComponent;