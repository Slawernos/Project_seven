import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
const theme = createTheme({
    palette: {
        primary: {
            main: '#cdcdcd',
        },
        secondary: {
            main: '#7f7f7f',
        },
    },
});


function ThemeComponent(props) {


    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    )
}


export default ThemeComponent;