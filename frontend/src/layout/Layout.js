import BasicMenu from '../UI/Menu'
import { Container } from '@mui/material';
import classes from './Layout.module.css'
import ThemeComponent from '../theme/Theme';
import FooterComponent from './Footer';

function Layout(props) {

    return (
        <div className={classes.homepageBgimage}>
            <ThemeComponent>
                <BasicMenu logout={props.logout} auth={props.auth}></BasicMenu>
                <Container >

                    {props.children}
                </Container>

                <FooterComponent ></FooterComponent>
            </ThemeComponent>
        </div>



    );


}

export default Layout;