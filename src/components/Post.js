import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FaPencilAlt, FaRegCommentDots, FaRetweet } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import ReactHashtag from "@mdnm/react-hashtag";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import requestApi from "../services/api/posts";
import ReactLoading from "react-loading";
import tokenDecode from "jwt-decode";
import useAuth from "../hooks/useAuth";
import CommentPost from "./CommentPost";
import LikePost from "./LikePost";
import Repost from "./Repost";
import requestCommentApi from "../services/api/comments";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    maxWidth: "597px",
    height: "262px",
    background: "#333333",
    borderRadius: "50px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function Post(props) {
  const { token } = useAuth();

  const { user, data } = props;

  const ref = useRef(null);
  const inputRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [loadingDelet, setLoadingDelet] = useState(false);
  const [editing, setEditing] = useState(false);
  const [disabledEdit, setDisableEdit] = useState(false);
  const [valueEdit, setValueEdit] = useState(data.description);
  const [openComment, setOpenComment] = useState(false);
  const [numberComments, setNumberComments] = useState(0);
  const decoded = tokenDecode(token);

  const navigate = useNavigate();

  const showModal = (id) => {
    setModalOpen(!modalOpen);
  };

  function editPost() {
    setEditing(!editing);
  }

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  function handleInput(e) {
    setValueEdit(e.target.value);
  }

  async function submitInput(e, id) {
    if (e.key === "Enter") {
      try {
        const promise = await requestApi.editPost(token, id, { description: valueEdit, url: data.url });
        setDisableEdit(true);
        if (promise.status === 200) {
          props.setUpdatePage(Math.floor(Math.random() * 10));
          setEditing(false);
          setDisableEdit(false);
        } else {
          alert("Não foi possível editar o seu usuário.");
        }
      } catch (error) {
        console.log(error);
        alert("Não foi possível editar o seu usuário");
      }
    }
    if (e.key === "Escape") {
      setEditing(false);
    }
  }

  const deletedPost = async (id) => {
    try {
      setLoadingDelet(true);
      await requestApi.deletePost(token, id);
      setModalOpen(false);
      props.setUpdatePage(Math.floor(Math.random() * 10));
      ref.current.style.display = "none";
    } catch (error) {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    const promise = requestCommentApi.count(token, data.id);
    promise.then((response) => {
      const { data } = response;
      setNumberComments(data);
    });
    promise.catch((e) => {
      console.log(e.message);
    });
  }, [props.updatePage]);
  return (
    <Div>
      {data.repost ? (
        <Retweet>
          <FaRetweet size={25} />
          <p>
            Re-posted by <span>{data.shareUserId === user ? "you" : data.shareUsername}</span>
          </p>
        </Retweet>
      ) : (
        ""
      )}
      <PostContainer ref={ref}>
        <Modal isOpen={modalOpen} onRequestClose={setModalOpen} contentLabel="Example Modal" style={customStyles}>
          {!loadingDelet ? (
            <>
              <TitleModal>Are you sure you want to delete this post?</TitleModal>
              <AreaButtonModal>
                <Button onClick={() => setModalOpen(false)}>No, go back</Button>
                <Button color="#1877F2" onClick={() => deletedPost(props.id)}>
                  Yes, delete it
                </Button>
              </AreaButtonModal>
            </>
          ) : (
            <ReactLoading type="spin" color="#fff" height={90} width={90} />
          )}
        </Modal>
        <img className="profile-img" src={data.image} alt="profile img" />
        <LikePost data={data} />
        <Comments>
          <FaRegCommentDots onClick={() => setOpenComment(!openComment)} />
          <span>{numberComments} comments</span>
        </Comments>
        <Repost data={data} />
        <div className="posts">
          <div className="post-header">
            <div className="post-content-left">
              <p
                onClick={() => {
                  navigate(`/user/${data.idUser}`);
                }}
              >
                {data.username}
              </p>
              {editing ? (
                <input
                  type="text"
                  ref={inputRef}
                  value={valueEdit}
                  onChange={(e) => handleInput(e)}
                  onKeyDown={(e) => submitInput(e, props.id)}
                  onBlur={() => setEditing(false)}
                  disabled={disabledEdit}
                ></input>
              ) : (
                <h1>
                  <ReactHashtag onHashtagClick={(val) => navigate(`/hashtag/${val.replace(/#/, "")}`)}>
                    {data.description ? data.description : " "}
                  </ReactHashtag>
                </h1>
              )}
            </div>
            {decoded.id === props.userId && (
              <>
                <div className="post-content-right">
                  <div className="post-action-button">
                    <div className="action-edit" onClick={() => editPost()}>
                      <FaPencilAlt size={15} color="#ffffff" />
                    </div>
                    <div className="action-delete" onClick={() => showModal()}>
                      <AiTwotoneDelete size={15} color="#fff" />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="link">
            <div className="text">
              <p>{data.title}</p>
              <h1>{data.urlDescription}</h1>
              <a target="_blank" rel="noopener noreferrer" href={data.url}>
                {data.url}
              </a>
            </div>
            <img src={data.postImage} alt="postImage" />
          </div>
        </div>
      </PostContainer>
      {openComment ? <CommentPost setUpdatePage={props.setUpdatePage} data={data} /> : <></>}
    </Div>
  );
}

const Div = styled.div`
  background-color: #1e1e1e;
  border-radius: 16px;
  margin-top: 30px;

  @media (min-width: 620px) {
    width: 611px;
  }
`;

const Retweet = styled.div`
  display: flex;
  flex-direction: row !important;
  align-items: center;
  width: 100%;
  background: #1e1e1e;
  border-radius: 16px;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: #ffffff;
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 13px;

  p {
    margin-left: 4px;
  }

  span {
    font-weight: 700;
  }
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #171717;
  color: #ffffff;
  padding: 25px;
  position: relative;
  border-radius: 16px;
  width: 611px;
  .post-header {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  transition: display 0.3s linear;

  .post-header > .post-content-left {
    flex: 1;
  }

  .post-action-button {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #ffffff;
    right: 26px;
  }

  .action-edit {
    margin-right: 10px;
    cursor: pointer;
    color: #ffffff;
  }

  & > .post-action-button > .action-delete {
    cursor: pointer;
    background: red;
  }

  .profile-img {
    display: inline;
    border: 1px solid #000000;
    border-radius: 100px;
    width: 50px;
    height: 50px;
    margin-right: 16px;
  }

  .posts {
    width: 100%;
    position: relative;
  }

  input {
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    color: #4c4c4c;
    width: 109%;
    height: fit-content;
    background: #ffffff;
    border-radius: 7px;
    margin-bottom: 9px;
    padding: 10px;
    word-break: break-word;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    align-items: baseline;

    p {
      font-size: 17px;
      font-weight: 400;
      padding-bottom: 10px;
    }

    a {
      font-size: 13px;
    }

    h1 {
      font-style: normal;
      font-weight: 400;
      font-size: 17px;
      color: #b7b7b7;
      padding-bottom: 10px;

      span {
        font-weight: 700;
        color: #ffffff;
      }
    }

    .link {
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: space-between;

      border: 1px solid #4d4d4d;
      border-radius: 11px;
      align-items: start;

      img {
        height: 155px;
        width: 50%;
        border-radius: 11px;
      }

      .text {
        display: flex;
        flex-wrap: wrap;
        height: 100%;
        max-width: 290px;
        word-break: break-word;
        p {
          padding: 20px;
          font-size: 15px;
          max-width: 250px;
        }

        h1 {
          font-style: normal;
          font-weight: 400;
          font-size: 13px;
          color: #9b9595;
          padding-left: 20px;
        }

        a {
          padding-left: 20px;
          text-decoration: none;
          color: white;
        }
      }
    }
  }

  @media (max-width: 620px) {
    border-radius: 0px;
    div {
      .link {
        img {
          height: 100%;
        }
      }
    }
  }
`;

const Comments = styled.div`
  display: flex;
  position: absolute;
  top: 150px;
  left: 32px;
  font-size: 20px;

  FaRegHeart {
    margin-left: 6px;
  }

  span {
    font-size: 11px;
    margin-top: 8px;
  }
`;

const TitleModal = styled.h1`
  width: 338px;
  font-weight: 700;
  text-align: center;
  font-size: 32px;
  color: #fff;
`;
const Button = styled.button`
  width: 134px;
  height: 37px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  background: ${(props) => (props.color ? props.color : "#fff")};
  color: ${(props) => (props.color !== "#1877F2" ? "#1877F2" : "#fff")};
`;
const AreaButtonModal = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
`;
