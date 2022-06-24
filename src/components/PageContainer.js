import React from "react";
import styled from "styled-components";
import { useState } from "react";

import Header from "./Header";
import PageTitle from "./PageTitle";
import BoxHashtag from "./BoxHashtag";

import useAuth from "../hooks/useAuth";
import requestFollow from '../services/api/follower'

function PageContainer({ title, picture, children, follow, changeStateButton, followParams }) {
	const [toggle, setToggle] = useState(false);
	const [close, setClose] = useState(true);
	const [disableButton, setDisableButton] = useState(false)

  const {  token } = useAuth();


	const following = async (from, to) => {
		try {
			setDisableButton(true)
			await requestFollow.requestFollow(token, from, to)
			setDisableButton(false)
			changeStateButton({ ...followParams, following: !followParams.following })
		} catch (error) {
			alert('erro ao seguir user')
		}
	}

	return (
		<>
			<Header toggle={toggle} setToggle={setToggle} close={close} setClose={setClose} />
			<Div>
				<Section onClick={() => { 
					setToggle(false);
					setClose(true)
					}}>	
					<PageTitle>{title} {follow?.show &&  <Button color={follow.following ? '#fff' : '#1877F2'} onClick={() => following(follow.from, follow.to)} disabled={disableButton}>{follow.following ? 'Unfollow' : 'Follow'}</Button>} </PageTitle>
					<Container>
						{children}
						<BoxHashtag />
					</Container>
				</Section>
			</Div>
		</>
	);
}

export default PageContainer;

const Div = styled.div`
	@media (min-width: 620px) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
`

const Section = styled.section`
	h4 {
		font-size: 20px;
		margin-top: 100px;
		color: #ffffff;
	}

  .loader {
    display: flex;
    width: 100%;
    height: 100px;
    justify-content: center;
    align-items: center;
    
    p {
      font-family: 'Lato';
      font-style: normal;
      font-weight: 400;
      font-size: 22px;
      line-height: 26px;
      letter-spacing: 0.05em;
      color: #6D6D6D;
    }
  }
`;

const Container = styled.div`
	display: flex;
	@media (min-width: 620px) {
		margin: 43px auto 0px auto;
	}
	@media (min-width: 1100px) {
		padding-right: 200px;
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
	position: absolute;
	right: -134px;
	cursor: pointer;
`;