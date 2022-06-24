import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useInterval from "use-interval";
import { BsArrowRepeat } from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroller";
import PageContainer from "./../components/PageContainer";
import CreatePost from "./../components/CreatePost";
import Post from "./../components/Post";
import requestPostsApi from "./../services/api/posts";
import requestHashtagsApi from "../services/api/hashtags";
import requestFollower from "../services/api/follower"
import styled from "styled-components";

function Timeline() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [hashtags, setHashtags] = useState({});
  const [error, setError] = useState(false);
  const [updatePage, setUpdatePage] = useState(0);
  const [newPosts, setNewPosts] = useState(false);
  const [newPostsTotal, setNewPostsTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [postsTotal, setPostsTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [userId, setUserId] = useState(0);
  const [followeSomeone, setFollowSomeone] = useState(true)
  const { token } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const promisePostsTotal = requestPostsApi.postsTotal(token);
    promisePostsTotal.then((response) => {
      setPostsTotal(response.data[0].numberOfPosts);
    });

    const promise = requestPostsApi.posts(token, limit);
    promise.then((response) => {
      setData(response.data.rows);
      setUserId(response.data.userId);
      setLoading(false);
      setHasMore(true);
    });
    promise.catch((error) => {
      setError(true);
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

    const followerSomeone = requestFollower.followerSomeone(token, userId)
    followerSomeone.then(({data}) => {
      setFollowSomeone(data.follow)
    })
  }, [updatePage]);

  useInterval(async () => {
    try {
      /*
      if (limit < postsTotal) {
        setHasMore(true);
      }
      */
      requestPostsApi.posts(token).then((response) => {
        let lastPostIndex = 0;
        const newPosts = response.data;

        if (newPosts[0].id !== data[0].id) {
          //search last equal post in data
          lastPostIndex = newPosts.findIndex((post) => post.id === data[0].id);
          setNewPostsTotal(lastPostIndex);
          setNewPosts(true);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }, 15000);

  async function handleUpdate() {
    console.log("______________inside handle update_______________________");
    console.log(limit);
    setHasMore(false);

    if (limit > postsTotal) {
      return;
    }
    setLimit(limit + 10);
    setUpdatePage(updatePage + 1);
    /*
      requestPostsApi.posts(token, limit + 10).then((response) => {
        console.log(response.data)
        setData([...data, ...response.data]);
      });
      */
  }

  return (
    <>
      <PageContainer title={"timeline"}>
        <DivFlex>
          <div>
            <CreatePost updatePage={updatePage} setUpdatePage={setUpdatePage} />
            {newPosts ? (
              <BlueBox
                onClick={() => {
                  setNewPosts(false);
                  setUpdatePage(updatePage + 1);
                }}
              >
                <p>{newPostsTotal} new posts, load more!</p>
                <BsArrowRepeat className="reload-icon" />
              </BlueBox>
            ) : null}
            <InfiniteScroll
              pageStart={0}
              loadMore={handleUpdate}
              hasMore={hasMore}
              loader={
                <div className="loader" key={0}>
                  <p>Loading ...</p>
                </div>
              }
              useWindow={true}
              threshold={1}
            >
              {loading ? (
                <h4>Loading...</h4>
              ) : error ? (
                <h4>An error occured while trying to fetch the posts, please refresh the page</h4>
              ) : data.length > 0 ? (
                data.map((post) => (
                  <Post user={userId} data={post} id={post.id} userId={post.idUser} setUpdatePage={setUpdatePage} updatePage={updatePage} />
                ))
              ) : (
                <h4>
                  {!followeSomeone && 'You don\'t follow anyone yet. Search for new friends!'}
                  {(followeSomeone && data.length === 0) && 'No posts found from your friends'}
                </h4>
              
              )}
              {console.log(followeSomeone, loading, data.length === 0)}
            </InfiniteScroll>
            {/* {!followeSomeone && <h4>You don't follow anyone yet. Search for new friends!</h4>} */}

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

const BlueBox = styled.div`
  display: flex;
  height: 61px;
  color: #ffffff;
  padding: 10px;
  align-items: center;
  justify-content: center;
  background-color: #1877f2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-top: 30px;

  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;

  .reload-icon {
    margin-left: 20px;
    font-size: 20px;
  }
`;
