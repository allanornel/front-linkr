import { FaRetweet } from "react-icons/fa";
import styled from "styled-components";
import React, { useState, useRef, useEffect } from "react";
import requestSharesApi from "../services/api/shares";
import useAuth from "./../hooks/useAuth";
import Modal from "react-modal";
import ReactLoading from "react-loading";

function Repost(props) {
  const { data } = props;
  const ref = useRef(null);
  const { token } = useAuth();
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shares, setShares] = useState(0);

  const showShareModal = () => {
    setShareModalOpen(!shareModalOpen);
  };

  const sharePost = async (id) => {
    try {
      setLoading(true);
      await requestSharesApi.sharePost(token, id);
      setShareModalOpen(false);
      props.setUpdatePage(Math.floor(Math.random() * 10));
      ref.current.style.display = "none";
    } catch (error) {
      setShareModalOpen(false);
    }
  };

  useEffect(() => {
    if (data) {
      const promise = requestSharesApi.getSharesByPostId(token, data.id);
      promise.then((res) => {
        const { data } = res;
        setShares(data[0].shares);
      });
    }
  });

  return (
    <>
      <Modal isOpen={shareModalOpen} onRequestClose={setShareModalOpen} contentLabel="Example Modal" style={customStyles}>
        {!loading ? (
          <>
            <TitleModal>Do you want to re-post this link?</TitleModal>
            <AreaButtonModal>
              <Button onClick={() => setShareModalOpen(false)}>No, cancel</Button>
              <Button color="#1877F2" onClick={() => sharePost(data.id)}>
                Yes, share!
              </Button>
            </AreaButtonModal>
          </>
        ) : (
          <ReactLoading type="spin" color="#fff" height={90} width={90} />
        )}
      </Modal>
      <RepostContainer>
        <FaRetweet onClick={() => showShareModal()}></FaRetweet>
        <span>{shares} re-posts</span>
      </RepostContainer>
    </>
  );
}

export default Repost;

const RepostContainer = styled.div`
  display: flex;
  position: absolute;
  top: 190px;
  left: 32px;
  font-size: 20px;

  FaRetweet {
    margin-left: 6px;
  }

  span {
    font-size: 11px;
    margin-top: 8px;
    margin-right: 10px;
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
