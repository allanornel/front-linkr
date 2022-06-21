import styled from 'styled-components';

import useAuth from "../hooks/useAuth";

import { FaRegPaperPlane } from "react-icons/fa";

function CommentPost(){
    const { token, image } = useAuth();

    return(
        <CommentContainer>
            <img src={image} alt='imagem usuário'/>
            <input placeholder="write a comment..."/>
            <FaRegPaperPlane className="plane" color="#F3F3F3"/>
        </CommentContainer>
    );
}

export default CommentPost;

const CommentContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1E1E1E;
  padding: 25px;
  border-radius: 16px;
  img{
    width: 39px;
    height: 39px;
    border-radius: 50px;
  }
  input{
    background-color: #252525;
    width: 510px;
    height: 39px;
    border: none;
    border-radius: 8px;
    padding: 15px;
    color: #ACACAC;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
  }
  .plane{
    position: absolute;
    top: 38px;
    right: 40px;
  }
`