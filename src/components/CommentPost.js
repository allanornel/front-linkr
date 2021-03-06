import styled from "styled-components";
import { FaRegPaperPlane } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import requestCommentApi from "./../services/api/comments";

function CommentPost(props) {
  const { data, setUpdatePage } = props;
  const { token, image } = useAuth();
  const { user, hashtag } = useParams();

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({ comment: "" });
  const [load, setLoad] = useState(false);
  const [update, setUpdate] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const promise = requestCommentApi.list(token, data.id);
    promise.then((response) => {
      const { data } = response;
      setComments([...data]);
    });
    promise.catch((e) => {
      console.log(e.message);
    });
  }, [update, user, hashtag]);

  function postComment(e) {
    e.preventDefault();
    setLoad(true);
    const promise = requestCommentApi.create(token, comment, data.id);
    promise.then((response) => {
      const { status } = response;
      console.log(status);
      setComment({ comment: "" });
      setUpdate(update + 1);
      setUpdatePage(Math.floor(Math.random() * 10));
      setLoad(false);
    });
    promise.catch((e) => {
      console.log(e.message);
      setLoad(false);
    });
  }

  return (
    <CommentContainer>
      {comments.map((item) => {
        const { comment, username, picture, userStatus, userId } = item;
        return (
          <div className="profile">
            <img src={picture} alt="imagem usuário" />
            <div>
              <h3>
                <b
                  onClick={() => {
                    navigate(`/user/${userId}`);
                    window.location.reload();
                  }}
                >
                  {username}
                </b>
                <span>{userStatus ? ` • ${userStatus}` : ""}</span>
              </h3>
              <p>{comment}</p>
            </div>
          </div>
        );
      })}

      <div className="comment">
        <img src={image} alt="imagem usuário" />
        <form onSubmit={postComment}>
          <input
            placeholder="write a comment..."
            onChange={(e) => setComment({ comment: e.target.value })}
            value={comment.comment}
            required
            disabled={load}
          />
          <FaRegPaperPlane onClick={postComment} className="plane" color="#F3F3F3" />
        </form>
      </div>
    </CommentContainer>
  );
}

export default CommentPost;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1e1e1e;
  padding: 25px;
  border-radius: 16px;
  .profile {
    display: flex;
    margin-bottom: 16px;
    border-bottom: 1px solid #353535;
    padding-bottom: 16px;
    img {
      width: 39px;
      height: 39px;
      border-radius: 50px;
    }
    div {
      margin-left: 18px;
      h3 {
        font-weight: 700;
        margin-bottom: 6px;
        color: #f3f3f3;
        span {
          color: #565656;
        }
      }
      p {
        color: #acacac;
      }
    }
  }

  .comment {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 39px;
      height: 39px;
      border-radius: 50px;
    }
    form {
      position: relative;
    }
    input {
      background-color: #252525;
      width: 510px;
      height: 39px;
      border: none;
      border-radius: 8px;
      padding: 15px;
      color: #acacac;
      font-family: "Lato", sans-serif;
      font-weight: 400;
    }
    .plane {
      position: absolute;
      top: 12px;
      right: 21px;
    }
  }
`;
