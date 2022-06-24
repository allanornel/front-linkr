import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import requestHashtagsApi from "../services/api/hashtags";
import PageContainer from "../components/PageContainer";
import Post from "../components/Post";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import requestPostsApi from "./../services/api/posts";
import InfiniteScroll from "react-infinite-scroller";

function HashtagPage() {
  const [updatePage, setUpdatePage] = useState(0);
  const [postsList, setPostsList] = useState([]);
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(false);
  const [postsTotal, setPostsTotal] = useState(0);
  const { token } = useAuth();
  const { hashtag } = useParams();

  useEffect(() => {
    const promisePostsTotal = requestPostsApi.postsTotal(token);
    promisePostsTotal.then((response) => {
      setPostsTotal(response.data[0].numberOfPosts);
    });

    try {
      async function fetchData() {
        const postsResponse = await requestHashtagsApi.getPostsByHashtag(hashtag, limit);
        setPostsList(postsResponse.data);
        setHasMore(true);
      }

      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, [token, hashtag, updatePage]);

  async function handleUpdate() {
    setHasMore(false);
    
    if (limit > postsTotal) {
      return; 
    }
    setLimit(limit + 10); 
    setUpdatePage(updatePage + 1);  
  }


  return (
    <PageContainer title={`# ${hashtag}`}>
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
          {postsList.length > 0 ? (
            postsList?.map((post, key) => <Post key={key} data={post} id={post.id} userId={post.idUser} setUpdatePage={setUpdatePage} />)
          ) : (
            <h4>There are no posts yet</h4>
          )}
        </InfiniteScroll>
        </div>
      </DivFlex>
    </PageContainer>
  );
}

export default HashtagPage;

const DivFlex = styled.div`
  display: flex;
`;

