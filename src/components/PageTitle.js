import React from 'react';
import styled from 'styled-components';

function PageTitle({ children }) {
  return <Title>{ children }</Title>;
}

export default PageTitle;

const Title = styled.h2`
  display: flex;
  align-items: center;
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-size: 33px;
  color: #ffffff;
  position: relative;
  padding: 28px 0px 19px 17px;
  margin-top: 100px;
  img{
    width: 50px;
    height: 50px;
    border-radius: 50px;
    margin-right: 18px;
  }
  @media (min-width: 620px){
    font-size: 43px;
    margin-top: 148px;
  }
`;
