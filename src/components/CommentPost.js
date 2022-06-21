import styled from 'styled-components';
import { FaRegPaperPlane } from "react-icons/fa";
import { useState } from 'react';

import useAuth from "../hooks/useAuth";
import requestCommentApi from './../services/api/comments';

function CommentPost(props){
    const { data } = props;
    const { token, image } = useAuth();

    const [ comment, setComment ] = useState({comment:""});
    const [ load, setLoad ] = useState(false);

    function postComment(e){
        e.preventDefault();
        setLoad(true);
        const promise = requestCommentApi.create(token, comment, data.id);
        promise.then((response) => {
            const { status } = response;
            console.log(status);
            setLoad(false);
        });
        promise.catch((e) => {
            console.log(e.message);
            setLoad(false);
        })
    }

    return(
        <CommentContainer>
            <div className='profile'>
                <img src={image} alt='imagem usuário'/>
                <div>
                    <h3>João Avatares <span> • following </span></h3>
                    <p>Adorei esse post, ajuda muito a usar Material UI com React!</p>
                </div>
            </div>

            <div className='comment'>
                <img src={image} alt='imagem usuário'/>
                <form onSubmit={postComment}>
                    <input 
                        placeholder="write a comment..."
                        onChange={(e) => setComment({comment: e.target.value})}
                        value={comment.comment}
                        required
                        disabled={load}
                        />
                    <FaRegPaperPlane onClick={postComment} className="plane" color="#F3F3F3"/>
                </form>
            </div>
        </CommentContainer>
    );
}

export default CommentPost;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1E1E1E;
  padding: 25px;
  border-radius: 16px;
  .profile{
    display: flex;
    margin-bottom: 16px;
    border-bottom: 1px solid #353535;
    padding-bottom: 16px;
    img{
        width: 39px;
        height: 39px;
        border-radius: 50px;
    }
    div{
        margin-left: 18px;
        h3{
            font-weight: 700;
            margin-bottom: 6px;
            color: #F3F3F3;
            span{
                color: #565656;
            }
        }
        p{
            color: #ACACAC;
        }
    }
  }

  .comment{
    display: flex;
    align-items: center;
    justify-content: space-between;
    img{
        width: 39px;
        height: 39px;
        border-radius: 50px;
    }
    form{
        position: relative;
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
        top: 12px;
        right: 21px;
    }
  }
`