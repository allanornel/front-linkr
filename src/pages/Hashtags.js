import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import requestHashtagsApi from "../services/api/hashtags";
import PageContainer from "../components/PageContainer";
import Post from "../components/Post";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import requestHashtagsApi from "../services/api/hashtags";

function HashtagPage() {
	const navigate = useNavigate();
	const [hashtags, setHashtags] = useState({});

	const [updatePage, setUpdatePage] = useState(0);

	const { token } = useAuth();
	const [postsList, setPostsList] = useState([]);
	const { hashtag } = useParams();

	useEffect(() => {
		try {
			async function fetchData() {
				const postsResponse = await requestHashtagsApi.getPostsByHashtag(
					hashtag
				);
				const hashtagsResponse = await requestHashtagsApi.getHashtags();
				setPostsList(postsResponse.data);
				setHashtags(hashtagsResponse.data);
			}

			fetchData();
		} catch (err) {
			console.log(err);
		}
	}, [token, hashtag]);

	return (
		<PageContainer title={hashtag}>
			<DivFlex>
				<div>
					{postsList.length > 0 ? (
						postsList?.map((post, key) => (
							<Post
								key={key}
								data={post}
								id={post.id}
								userId={post.idUser}
								setUpdatePage={setUpdatePage}
							/>
						))
					) : (
						<h4>There are no posts yet</h4>
					)}
				</div>

				<ContainerHashtag>
					<div>
						<h1>trending</h1>
					</div>

					{hashtags.length > 0 ? (
						hashtags.map((hashtag, key) => (
							<p
								key={key}
								onClick={() => {
									navigate(`/hashtag/${hashtag.name}`);
								}}
							>
								{" "}
								# {hashtag.name}
							</p>
						))
					) : (
						<p>There are no hashtags yet</p>
					)}
				</ContainerHashtag>
			</DivFlex>
		</PageContainer>
	);
}

export default HashtagPage;
const DivFlex = styled.div`
	display: flex;
	width: 100%;
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

	@media only screen and (max-width: 1000px) {
		display: none;
	}
`;
