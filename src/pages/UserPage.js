import { useState, useEffect } from 'react';
import PageContainer from './../components/PageContainer';
import Post from './../components/Post';
import requestPostsApi from './../services/api/posts';
import useAuth from "../hooks/useAuth";

function UserPage(props) {
    //const { user } = props;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [error, setError] = useState(false);
    const { token } = useAuth();
    //user test DELETE
    const user = {username:"test", id:"1"}
    useEffect(() => {
        const promise = requestPostsApi.userPosts(token, user.id);
        promise.then((response) => {
          setData(response.data);
          setLoading(false);
        })
        promise.catch((error) => {
          setError(true);
          setLoading(false);
          console.log(error.message);
        })
    }, [])

    return(
        <PageContainer title={`${user.username}'s posts`}>
            {loading ? <h4>Loading...</h4> : error ? <h4>An error occured while trying to fetch the posts, please refresh the page</h4>
            : data.length > 1 ? data.map(post => ( <Post data={post} /> )) : 
            <h4>There are no posts yet</h4>}
        </PageContainer>
    )
}

export default UserPage;