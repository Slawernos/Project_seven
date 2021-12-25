import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export function BasicCard() {
    return (
        <Card sx={{ minWidth: '200px', width: '100%' }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Test Title
                </Typography>
                <Typography variant="h5" component="div">
                    Test content
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    author test
                </Typography>
                <Typography variant="body2">
                    author test message
                    <br />

                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">👍</Button>
                <Button size="small">👎</Button>
            </CardActions>
        </Card>
    );
}

export function ReactiveCard(props) {
    return (
        <Card sx={{ minWidth: '200px', width: '100%', marginTop: '25px' }}>
            <CardContent>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                    {props.title}
                </Typography>
                <Typography sx={{ fontSize: 14 }} component="div">
                    {props.content}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {props.author}
                </Typography>
                <Typography variant="body2">
                    {props.authorMessage}
                    <br />

                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">👍</Button>
                <Button size="small">👎</Button>
            </CardActions>
        </Card>
    );
}




