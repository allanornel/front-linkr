import { useState, useEffect } from 'react';

import PageContainer from './../components/PageContainer';
import CreatePost from './../components/CreatePost';
import Post from './../components/Post';
import requestPostsApi from './../services/api/posts';

function Timeline() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  //user test DELETE
  const user = {image: "https://upload.wikimedia.org/wikipedia/commons/a/af/Bananas_%28Alabama_Extension%29.jpg", username: "test"};

  useEffect(() => {
    const promise = requestPostsApi.posts();
    promise.then((response) => {
      setData(response.data);
      setLoading(false);
    })
    promise.catch((error) => {
        setLoading(false);
        setError(true);
        console.log(error.message);
    })
  }, [])

  return (
    <>
      <PageContainer title={"timeline"}>
        <CreatePost />
        {loading ? <p>Loading...</p> : error ? <p>An error occured while trying to fetch the posts, please refresh the page</p>
        : data ? data.map(post => ( <Post user={user} data={post} /> )) : 
        <p>There are no posts yet</p>}
      </PageContainer>
    </>
  );
}

export default Timeline;