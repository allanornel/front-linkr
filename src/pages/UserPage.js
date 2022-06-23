import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import jwtDecode from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import PageContainer from "./../components/PageContainer";
import Post from "./../components/Post";
import requestPostsApi from "./../services/api/posts";
import requestFollower from "./../services/api/follower";
import requestHashtagsApi from "../services/api/hashtags";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";

function Timeline() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([{ username: "" }]);
  const [username, setUsername] = useState("");
  const [hashtags, setHashtags] = useState({});
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

    const promiseHashtag = requestHashtagsApi.getHashtags();
    promiseHashtag.then((response) => {
      setHashtags(response.data);
      //setLoading(false);
    });
    promiseHashtag.catch((error) => {
      //setLoading(false);
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
          <ContainerHashtag>
            <div>
              <h1>trending</h1>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : hashtags.length > 0 ? (
              hashtags.map((hashtag) => (
                <p
                  onClick={() => {
                    navigate(`/hashtag/${hashtag.name}`);
                  }}
                >
                  # {hashtag.name}
                </p>
              ))
            ) : (
              <p>There are no hashtags yet</p>
            )}
          </ContainerHashtag>
        </DivFlex>
      </PageContainer>
    </>
  );
}

export default Timeline;

const DivFlex = styled.div`
  display: flex;
`;

const ContainerHashtag = styled.div`
  margin-left: 25px;
  width: 301px;
  height: 406px;
  background: #171717;
  border-radius: 16px;
  color: #ffffff;
  font-style: normal;
  font-weight: 700;

  div {
    padding-bottom: 12px;
    margin-bottom: 22px;
    border-bottom: 1px solid #484848;
  }

  h1 {
    font-family: "Oswald";
    font-size: 27px;
    line-height: 40px;
    margin-left: 16px;
    margin-top: 8px;
  }

  p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 19px;
    line-height: 23px;
    letter-spacing: 0.05em;
    margin-left: 16px;
  }

  @media only screen and (max-width: 800px) {
    display: none;
  }
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
