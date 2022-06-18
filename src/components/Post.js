import React, {useState} from 'react'
import styled from 'styled-components';
import { FaRegHeart,  } from 'react-icons/fa';
import { AiTwotoneDelete } from "react-icons/ai";
import ReactHashtag from "@mdnm/react-hashtag";
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom'
import requestApi from '../services/api/posts'
import useAuth from "../hooks/useAuth";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent:'space-evenly',
      alignItems: 'center',
      maxWidth:   '597px',
      height: '262px',
      background: '#333333',
      borderRadius: '50px',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

export default function Post(props) {
    const { token } = useAuth();

    const { user, data } = props;
    const [modalOpen, setModalOpen] = useState(false)
    const [idSelected, setIdSelected] = useState(0)

    console.log(props)

    const navigate = useNavigate()

    const showModal =  (id) => {
        setModalOpen(!modalOpen)
        setIdSelected(id)
    }

    const deletedPost = async (id) => {
        await requestApi.deletePost(token, id)
        setModalOpen(false)
        setIdSelected(0)
    }
    return (
        <PostContainer>
      <Modal
        isOpen={modalOpen}
        onRequestClose={setModalOpen}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <TitleModal>Are you sure you want to delete this post?</TitleModal>
        <AreaButtonModal>
            <Button onClick={() => setModalOpen(false)}>No, go back</Button>
            <Button color="#1877F2" onClick={() => deletedPost(idSelected) }>Yes, delete it</Button>
        </AreaButtonModal>
      </Modal>


            <img className='profile-img' src={data.image}  />
            <Likes>
                <FaRegHeart />
                <span>{data.likesTotal} likes</span>
            </Likes>
            <div className='posts'>
                <div className="post-header">
                 <div className="post-content-left">
                  <p>{data.username}</p>
                    <h1>
                        <ReactHashtag onHashtagClick={val => navigate(`/hastag/${val.replace(/#/, '')}`)}>
                        {data.description ? data.description : " "} {/*data.hashtag*/}
                        </ReactHashtag>
                    </h1>
                 </div>
                 <div className="post-content-right">
                 <div className="post-action-button">
                    <div className="action-delete" onClick={() => showModal(data.id)}>
                        <AiTwotoneDelete size={15} color="#fff"  />
                    </div>
                </div>
                 </div>
                </div>                     
                <div className='link'>
                    <div className='text'>
                        <p>{data.title}</p>
                        <h1>{data.urlDescription}</h1>
                        <a target="_blank" rel="noopener noreferrer" href={data.url}>{data.url}</a>
                    </div>
                    <img src={data.postImage}/>
                </div>
            </div>
        </PostContainer>
    )
}

const PostContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 290px;
    width: 610px;
    background-color: #252525;
    color: #ffffff;
    margin-top: 30px;
    padding: 25px;
    position: relative;
    border-radius: 16px;

    .post-header {
        display: flex;
        flex-direction: row;
        width: 100%;
    }

    .post-header > .post-content-left {
        flex: 1;
    }

    .post-action-button {
        // position: absolute;
        right: 26px;
    }

    & > .post-action-button > .action-delete {
        cursor: pointer;
        // width: 30px;
        // height: 30px;
        background: red;
    }
    

    .profile-img{
        display: inline;
        border: 1px solid #000000;
        border-radius: 100px;
        width: 50px;
        height: 50px;
        margin-right: 16px;
    }

    .posts{
        max-width: 100%;
        position: relative;
    }
    
    div{
        display: flex;
        flex-direction: column;
        align-items: center;
        
        align-items: baseline;

        p{  
            font-size: 17px;
            font-weight: 400;
            padding-bottom: 10px;
        }

        a{
            font-size: 13px;
        }

        h1{
            font-style: normal;
            font-weight: 400;
            font-size: 17px;
            color: #B7B7B7;
            padding-bottom: 10px;

            span{
                font-weight: 700;
                color: #ffffff;
            }
        }
        
        .link{
            display: flex;
            flex-direction: row;
            min-height: 180px;
            
            border: 1px solid #4D4D4D;
            border-radius: 11px;
            align-items: start;

            img{
                height: 179px;
                width: 200px;
                border-radius: 11px;
            }

            .text{
                display: flex;
                flex-wrap: wrap;
                height: 100%;
                max-width: 290px;
                word-break: break-word;
                p{
                    padding: 20px;
                    font-size: 15px;
                    max-width: 250px;
                }

                h1{
                    font-style: normal;
                    font-weight: 400;
                    font-size: 13px;
                    color: #9B9595;
                    padding-left: 20px;
                }

                a{
                    padding-left: 20px;
                    text-decoration: none;
                    color: white;
                }
            }
        }
    }
   
    

    

`

const Likes = styled.div`
    display: flex;
    position: absolute;
    top: 100px;
    left: 32px;
    font-size: 20px;

    FaRegHeart{
        margin-left: 6px;
    }

    span {
        font-size: 11px;
        margin-top: 8px;
    }
`

const TitleModal = styled.h1`
    width: 338px;
    font-weight: 700;
    font-size: 32px;
    color: #fff;
`
const Button = styled.button`
    width: 134px;
    height: 37px;
    border-radius: 5px;
    cursor: pointer;
    border: none;
    background: ${props => props.color ? props.color : '#fff'};
    color: ${props => props.color !== '#1877F2' ? '#1877F2' : '#fff'}
`
const AreaButtonModal = styled.div`
    width: 300px;
    display: flex;
    justify-content: space-between;
`