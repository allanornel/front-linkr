import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import PageTitle from './PageTitle';

function PageContainer({ title, children }) {
  return (
    <>
      <Header />
      <Section>
        <PageTitle>{ title }</PageTitle>
        <Container>{ children }</Container>
      </Section>
    </>
  );
}

export default PageContainer;

const Section = styled.section`
  @media (min-width: 620px){
    margin: 0px auto 0px auto;
    display: flex;
    flex-direction: column;
    width: 620px;
  }
`

const Container = styled.div`
  @media (min-width: 620px){
    margin: 43px auto 0px auto;
  }
`;

