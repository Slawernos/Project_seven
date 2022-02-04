import { useContext } from "react"
import { PostsContext } from "./PostsContext"
import { Box, Button } from "@mui/material";
import { PostCall } from "./FetchCalls";

export default function ButtonPair(props) {
    const [posts, setPosts] = useContext(PostsContext);


    const prevPost = () => {
        PostCall(props.auth.token, false, posts).then((result) => {
            setPosts(result)
        }).catch((result) => {
            alert(result)
        })
    }
    const nextPost = () => {
        PostCall(props.auth.token, true, posts).then((result) => {
            setPosts(result)
        }).catch((result) => {
            alert(result)
        })
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px' }}>
            <Button color='secondary' onClick={prevPost}>Load Previous Posts</Button>
            <Button color='secondary' onClick={nextPost}>Load Next Posts</Button>
        </Box>
    )
}