import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container'
import { topContributors } from '../elements/FetchCalls';
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'
import { Box } from '@mui/system';

function Home(props) {
    const navigate = useNavigate();
    const [rows, setRows] = React.useState();
    React.useEffect(() => {
        topContributors(props.auth.token).then((res) => {
            let tempArray = new Array();
            res.map((item, index) => {
                tempArray.push({ "contributor": item.username, "posts": item.count, key: index });
            })
            setRows(tempArray)


        }
        ).catch((res) => {
            window.confirm((res));
            navigate('/');
            localStorage.clear();
        });

    }, [])

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
                        {rows != null ? rows.map((row) => (
                            <TableRow
                                key={row.key}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.contributor}
                                </TableCell>
                                <TableCell align="right">{row.posts}</TableCell>

                            </TableRow>
                        )) : <tr></tr>}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                <Button component={Link} to='/dashboard' variant='outlined' color='secondary'>Go to Posts</Button>
            </Box>
        </Container >);
}


export default Home;

