import React from 'react';
import styled from 'styled-components';

import PageTitle from './PageTitle';

function PageContainer({ title, children }) {
  return (
    <>
      <PageTitle>{title}</PageTitle>
      <Container>{children}</Container>
    </>
  );
}

export default PageContainer;

const Container = styled.div``;
