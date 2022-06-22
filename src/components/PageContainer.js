import React from "react";
import styled from "styled-components";
import { useState } from "react";

import Header from "./Header";
import PageTitle from "./PageTitle";

function PageContainer({ title, children }) {
	const [toggle, setToggle] = useState(false);
	const [close, setClose] = useState(true);

	return (
		<>
			<Header toggle={toggle} setToggle={setToggle} close={close} setClose={setClose}/>
			<Div>
				<Section onClick={() => { 
					setToggle(false);
					setClose(true)
					}}>	
					<PageTitle>{title}</PageTitle>
					<Container>{children}</Container>
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
	@media (min-width: 800px) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 800px;
	}

  .loader {
    display: flex;
    width: 100%;
    height: 100px
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
	@media (min-width: 620px) {
		margin: 43px auto 0px auto;
	}
`;
