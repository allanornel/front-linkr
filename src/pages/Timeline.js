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
import styled from "styled-components";

function Timeline() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [updatePage, setUpdatePage] = useState(0);
  const [newPosts, setNewPosts] = useState(false);
  const [newPostsTotal, setNewPostsTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [postsTotal, setPostsTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [userId, setUserId] = useState(0);
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
  }, [updatePage]);

  useInterval(async () => {
    try {
      requestPostsApi.posts(token).then((response) => {
        let lastPostIndex = 0;
        const newPosts = response.data;
        
        if (newPosts.rows[0]?.id !== data[0].id ) {
          //search last equal post in data
          lastPostIndex = newPosts.rows.findIndex((post) => post.id === data[0].id);
          setNewPostsTotal(lastPostIndex);
          setNewPosts(true);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }, 15000);

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
