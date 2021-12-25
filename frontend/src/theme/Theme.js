import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
const theme = createTheme({
    palette: {
        primary: {
            main: blue[700],
        },
        secondary: {
            main: blue[100],
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