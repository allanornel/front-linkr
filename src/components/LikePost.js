import styled from 'styled-components';
import ReactTooltip from "react-tooltip";
import { useState, useEffect } from 'react';
import { FaRegHeart, FaHeart } from "react-icons/fa";

import useAuth from './../hooks/useAuth';
import requestLikesApi from "./../services/api/likes";

function LikePost(props) {
    const { data } = props;
    const { token } = useAuth();

    const [like, setLike] = useState({ numberLikes: 0, twoFirst: [], isLike: false });
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        if (data) {
          const promise = requestLikesApi.getLike(token, data.id);
          promise.then((response) => {
            const { data } = response;
            setLike({ ...data });
          });
          promise.catch((e) => {
            console.log(e.message);
          });
        }
    }, [data, update]);
    
    function likePost() {
        const promise = requestLikesApi.postLike(token, data.id);
        promise.then(() => {
          setUpdate(update + 1);
        });
        promise.catch((e) => {
          console.log(e.message);
        });
    }

    return(
        <>
            <Likes data-tip data-for={data.id.toString()}>
                {like.isLike ? <FaHeart onClick={likePost} color="#AC0000" /> : <FaRegHeart onClick={likePost} color="#FFFFFF" />}
                <span>{like.numberLikes} likes</span>
            </Likes>
            <ReactTooltip id={data.id.toString()} place="bottom" backgroundColor="#FFFFFFE5" textColor="#505050" effect="solid">
                <span>
                {like.numberLikes > 3
                    ? `${like.twoFirst[0]}, ${like.twoFirst[1]} e outras ${like.numberLikes - 2} pessoas`
                    : like.numberLikes > 2
                    ? `${like.twoFirst[0]}, ${like.twoFirst[1]} e outra pessoa`
                    : like.numberLikes > 1
                    ? `${like.twoFirst[0]} e ${like.twoFirst[1]}`
                    : like.numberLikes > 0
                    ? `${like.twoFirst[0]}`
                    : "Ninguém curtiu"}
                </span>
            </ReactTooltip>
        </>
    );
}

export default LikePost;

const Likes = styled.div`
  display: flex;
  position: absolute;
  top: 100px;
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