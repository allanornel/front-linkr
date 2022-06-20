import React from "react";
import styled from "styled-components";
import { useState } from "react";

import Header from "./Header";
import PageTitle from "./PageTitle";

function PageContainer({ title, children }) {
	const [toggle, setToggle] = useState(false);

	return (
		<>
			<Header toggle={toggle} setToggle={setToggle} />
			<Section onClick={() => setToggle(false)}>	
				<PageTitle>{title}</PageTitle>
				<Container>{children}</Container>
			</Section>
		</>
	);
}

export default PageContainer;

const Section = styled.section`
	box-sizing: border-box;
	h4 {
		font-size: 20px;
		margin-top: 100px;
		color: #ffffff;
	}
	@media (min-width: 620px) {
		display: flex;
		flex-direction: column;
	}
`;

const Container = styled.div`
	@media (min-width: 620px) {
		margin: 43px auto 0px auto;
	}
`;
