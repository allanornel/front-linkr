import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import PageContainer from "./../components/PageContainer";
import CreatePost from "./../components/CreatePost";
import Post from "./../components/Post";
import requestPostsApi from "./../services/api/posts";
import requestHashtagsApi from "../services/api/hashtags";

function Timeline() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [hashtags, setHashtags] = useState({});
  const [error, setError] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();
  //user test DELETE
  const user = {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/af/Bananas_%28Alabama_Extension%29.jpg",
    username: "test",
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const promise = requestPostsApi.posts(token);
    promise.then((response) => {
      setData(response.data);
      setLoading(false);
    });
    promise.catch((error) => {
      setError(true);
      setLoading(false);
      console.log(error.message);
    });
  }, []);

  useEffect(() => {
    const promise = requestHashtagsApi.getHashtags();
    promise.then((response) => {
      setHashtags(response.data);
      setLoading(false);
    });
    promise.catch((error) => {
      setError(true);
      setLoading(false);
      console.log(error.message);
    });
  });

  console.log(data);
  console.log(token);

  return (
    <>
      <PageContainer title={"timeline"}>
        <CreatePost />
        {loading ? (
          <h4>Loading...</h4>
        ) : error ? (
          <h4>
            An error occured while trying to fetch the posts, please refresh the
            page
          </h4>
        ) : data.length > 1 ? (
          data.map((post) => <Post user={user} data={post} />)
        ) : (
          <h4>There are no posts yet</h4>
        )}
        {loading ? (
          <h4>Loading...</h4>
        ) : error ? (
          <h4>
            An error occured while trying to fetch the posts, please refresh the
            page
          </h4>
        ) : hashtags.length > 1 ? (
          hashtags.map((hashtag) => <p>{hashtag.name}</p>)
        ) : (
          <h4>There are no hashtags yet</h4>
        )}
      </PageContainer>
    </>
  );
}

export default Timeline;
