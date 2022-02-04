import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container'
import { ReactiveCard } from '../elements/Card';
import { topContributors } from '../elements/FetchCalls';
import {useNavigate} from 'react-router-dom'

function createData(contributor, posts) {
    return { contributor, posts };
}

function Home(props) {
    const navigate = useNavigate();
    const [rows,setRows] = React.useState([{"":"","":""}]);
    topContributors(props.auth.token).then((res)=>{
        let tempArray = new Array();
        res.map((item)=>{
            tempArray.push({[item.username]:item.count});

        })
        console.log(tempArray)

    }
    ).catch((res)=>{
        window.confirm((res));
        navigate('/');
        localStorage.clear(); 
    });
    return (

        <Container disableGutters maxWidth="sm" sx={{

            maxWidth: '100%',
            marginBottom: '30px'
        }}>
            <h1>Activity dashboard</h1>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Top Contributors</TableCell>
                            <TableCell align="right">Posts</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.contributor}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.contributor}
                                </TableCell>
                                <TableCell align="right">{row.posts}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <h1>Most recent post:</h1>
            <ReactiveCard
                title={"Reactive Title"}
                content={"Reactive content"}
                author={"Reactive Author"}
                authorMessage={"Reactive Author message"}
            />

        </Container >);
}


export default Home;

