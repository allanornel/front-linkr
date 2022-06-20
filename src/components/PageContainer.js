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
`;

const Container = styled.div`
	@media (min-width: 620px) {
		margin: 43px auto 0px auto;
	}
`;
