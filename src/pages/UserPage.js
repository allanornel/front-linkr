import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import jwtDecode from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import PageContainer from "./../components/PageContainer";
import Post from "./../components/Post";
import requestPostsApi from "./../services/api/posts";
import requestFollower from "./../services/api/follower";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";

function Timeline() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([{ username: "" }]);
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const [updatePage, setUpdatePage] = useState(0);
  const [followParams, setFolowParams] = useState({
    following: false,
    show: false,
    from: 0,
    to: 0,
  });
  const { token } = useAuth();
  const navigate = useNavigate();
  const { user } = useParams();
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(false);
  const [postsTotal, setPostsTotal] = useState(0);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  const userLogged = jwtDecode(token);

  useEffect(() => {
    const promisePostsTotal = requestPostsApi.postsTotal(token);
    promisePostsTotal.then((response) => {
      setPostsTotal(response.data[0].numberOfPosts);
    });

    const promise = requestPostsApi.userPosts(token, user, limit);
    promise.then((response) => {
      const { data } = response;
      setData(data.posts);
      setUsername(data.name);
      setLoading(false);
      setHasMore(true);
    });
    promise.catch((error) => {
      // setError(true);
      setLoading(false);
      console.log(error.message);
    });
  }, [updatePage, user]);

  useEffect(() => {
    requestFollower
      .follower(token, userLogged.id, user)
      .then(({ data }) =>
        setFolowParams({ ...followParams, following: data.iFollow, show: userLogged.id !== parseInt(user), from: userLogged.id, to: user })
      );
  }, []);


  async function handleUpdate() {
    setHasMore(false);
    
    if (limit > postsTotal) {
      return; 
    }
    setLimit(limit + 10); 
    setUpdatePage(updatePage + 1);  
  }

  return (
    <>
      <PageContainer title={`${username}'s posts`} follow={followParams} changeStateButton={setFolowParams} followParams={followParams}>
        {/* <Button /> */}
        <DivFlex>
          <div>
            <InfiniteScroll
                pageStart={0}
                loadMore={handleUpdate}
                hasMore={hasMore}
                loader={<div className="loader" key={0}><p>Loading ...</p></div>}
                useWindow={true}
                threshold={1}              
            >
            {loading ? (
              <h4>Loading...</h4>
            ) : error ? (
              <h4>An error occured while trying to fetch the posts, please refresh the page</h4>
            ) : data.length > 0 ? (
              data.map((post) => <Post data={post} id={post.id} userId={post.idUser} setUpdatePage={setUpdatePage} />)
            ) : (
              <h4>There are no posts yet</h4>
            )}
            </InfiniteScroll>
          </div>
        </DivFlex>
      </PageContainer>
    </>
  );
}

export default Timeline;

const DivFlex = styled.div`
  display: flex;
`;

const Button = styled.button`
  width: 134px;
  height: 37px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  background: ${(props) => (props.color ? props.color : "#fff")};
  color: ${(props) => (props.color !== "#1877F2" ? "#1877F2" : "#fff")};
`;
