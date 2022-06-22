import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useInterval from 'use-interval';
import { BsArrowRepeat } from 'react-icons/bs';
import InfiniteScroll from "react-infinite-scroller";
import PageContainer from "./../components/PageContainer";
import CreatePost from "./../components/CreatePost";
import Post from "./../components/Post";
import requestPostsApi from "./../services/api/posts";
import requestHashtagsApi from "../services/api/hashtags";
import styled from "styled-components";

function Timeline() {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [hashtags, setHashtags] = useState({});
	const [error, setError] = useState(false);
	const [updatePage, setUpdatePage] = useState(0);
  const [newPosts, setNewPosts] = useState(false);
  const [newPostsTotal, setNewPostsTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [postsTotal, setPostsTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
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
    const promisePostsTotal = requestPostsApi.postsTotal(token);
    promisePostsTotal.then((response) => {
      setPostsTotal(response.data[0].numberOfPosts);
    });

		const promise = requestPostsApi.posts(token, 0);
		promise.then((response) => {
			setData(response.data);
			setLoading(false);
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
	}, [updatePage]);


  useInterval(async () => {
    try {
      requestPostsApi.posts(token).then((response) => {
        let lastPostIndex = 0;
        const newPosts = response.data;
        
        if (newPosts[0].id !== data[0].id) {
          //search last equal post in data
          lastPostIndex = newPosts.findIndex(
            (post) => post.id === data[0].id
          );
          setNewPostsTotal(lastPostIndex);
          setNewPosts(true);
        }
      });

    } catch (error) {
      console.log(error.message);
    }
  }, 15000);


  async function handleUpdate() {
    console.log("______________inside handle update_______________________")
    try {
      if (offset > postsTotal) {
        setHasMore(false);
        return; 
      }

      setOffset(offset + 10); 
      console.log(offset)
      const promise = requestPostsApi.posts(token, offset);
      promise.then((response) => {
        console.log(response.data)
        setData(...data, response.data);
      });
    } catch (error) {
      console.log(error.message);
    }
  }


	return (
		<>
			<PageContainer title={"timeline"}>
				<DivFlex>
					<div>
						<CreatePost updatePage={updatePage} setUpdatePage={setUpdatePage} />
            {newPosts ? 
            <BlueBox onClick={() => {
              setNewPosts(false);
              setUpdatePage(updatePage + 1);
            }}>
              <p>{newPostsTotal} new posts, load more!</p>
              <BsArrowRepeat className='reload-icon'/> 
            </BlueBox> : null}
            <InfiniteScroll
              pageStart={0}
              loadMore={handleUpdate}
              hasMore={hasMore}
              loader={<div className="loader" key={0}>Loading ...</div>}
              threshold={100}
              useWindow={false}              
            >
						{loading ? (
							<h4>Loading...</h4>
						) : error ? (
							<h4>
								An error occured while trying to fetch the posts, please refresh
								the page
							</h4>
						) : data.length > 0 ? (
							data.map((post) => (
								<Post
									user={user}
									data={post}
									id={post.id}
									userId={post.idUser}
									setUpdatePage={setUpdatePage}
								/>
							))
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

const BlueBox = styled.div`
  display: flex;
  height: 61px;
  color: #ffffff;
  padding: 10px;
  align-items: center;
  justify-content: center;
  background-color: #1877F2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-top: 30px;

  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;

  .reload-icon {
    margin-left: 20px;
    font-size: 20px;
  }
`