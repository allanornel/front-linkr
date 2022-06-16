import styled from 'styled-components';
import { FaRegHeart } from 'react-icons/fa';

export default function Post(props) {
    const { user, data } = props;

    return (
        <PostContainer>
            <img className='profile-img' src={data.image} />
            <Likes>
                <FaRegHeart />
                <span>{data.likesTotal} likes</span>
            </Likes>
            <div>
                <p>{data.username}</p>
                <h1>{data.description} <span>{data.hashtag}</span></h1>
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
    background-color: #252525;
    color: #ffffff;
    margin-top: 30px;
    padding: 25px;
    position: relative;
    border-radius: 16px;

    .profile-img{
        display: inline;
        border: 1px solid #000000;
        border-radius: 100px;
        width: 50px;
        height: 50px;
        margin-right: 16px;
    }
    
    div{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        align-items: baseline;

        p{  
            font-size: 17px;
            font-weight: 400;
            padding-bottom: 10px;
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
            height: 180px;
            width: 100%;
            border: 1px solid #4D4D4D;
            border-radius: 11px;
            align-items: start;

            img{
                height: 179px;
                width: 200px;
            }

            .text{
                p{
                    padding: 20px;
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