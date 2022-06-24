import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import requestHashtagsApi from "../services/api/hashtags";

function BoxHashtag(){
    const [hashtags, setHashtags] = useState({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const promiseHashtag = requestHashtagsApi.getHashtags();
        promiseHashtag.then((response) => {
            setHashtags(response.data);
            setLoading(false);
        });
        promiseHashtag.catch((error) => {
            setLoading(false);
            console.log(error.message);
        });
    }, []);

    return(
        <ContainerHashtag>
            <div>
              <h1>trending</h1>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : hashtags.length > 0 ? (
              hashtags.map((hashtag) => (
                <p
                  onClick={() => {
                    navigate(`/hashtag/${hashtag.name}`);
                  }}
                >
                  # {hashtag.name}
                </p>
              ))
            ) : (
              <p>There are no hashtags yet</p>
            )}
        </ContainerHashtag>
    );
}

export default BoxHashtag;

const ContainerHashtag = styled.div`
  position: fixed;
  margin-left: 630px;
  width: 301px;
  height: 406px;
  background: #171717;
  border-radius: 16px;
  color: #ffffff;
  font-style: normal;
  font-weight: 700;

  div {
    padding-bottom: 12px;
    margin-bottom: 22px;
    border-bottom: 1px solid #484848;
  }

  h1 {
    font-family: "Oswald";
    font-size: 27px;
    line-height: 40px;
    margin-left: 16px;
    margin-top: 8px;
  }

  p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 19px;
    line-height: 23px;
    letter-spacing: 0.05em;
    margin-left: 16px;
  }

  @media only screen and (max-width: 1100px) {
    display: none;
  }
`;