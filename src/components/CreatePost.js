import styled from 'styled-components';
import { useState } from 'react';

import requestPostsApi from './../services/api/posts';

function CreatePost(){
    const [post, setPost] = useState({url:"", description:""});
    const [loading, setLoading] = useState(false);

    const token = 'fe24d84cacf36d73051fb806587368a1';
    const config = {
        headers: {Authorization: `Bearer ${token}`} 
    };

    function publishPost(e){
        e.preventDefault();
        setLoading(true);
        const promise = requestPostsApi.create(
            post,
            config
        )
        promise.then((response) => {
            setLoading(false);
            setPost({url:"", description:""});
            console.log(response);
        })
        promise.catch((e) => {
            setLoading(false);
            alert("Houve um erro ao publicar seu link");
            console.log(e.message);
        })
    }

    return(
        <NewPost>
            <p className='image'>aaaaaa</p>
            <div>
                <p>What are you going to share today?</p>
                <form onSubmit={publishPost}>
                    <input  
                        placeholder="http://..." 
                        onChange={(e) => setPost({...post, url: e.target.value})}
                        value={post.url}
                        required
                        disabled={loading}
                        />
                    <input 
                        className='description' 
                        placeholder="Awesome article about #javascript" 
                        onChange={(e) => setPost({...post, description: e.target.value})}
                        value={post.description}
                        disabled={loading}
                        />
                    <button disabled={loading} type='submit'>
                        { loading ? 'Publishing...' : 'Publish' }
                    </button>
                </form>
            </div>
        </NewPost>
    );
}

export default CreatePost;

const NewPost = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 164px;
    background-color: #ffffff;
    padding: 15px;
    position: relative;
    .image{
        display: none;
    }
    div{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        p{
            font-size: 17px;
            font-weight: 400;
            color: #707070;
            padding-bottom: 10px;
        }
        form{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            input{
                margin: 5px auto 0px auto;
                width: 100%;
                height: 30px;
                border-radius: 5px;
                border: none;
                background-color: #EFEFEF;
                padding: 6px;
                font-family: 'Lato', sans-serif;
            }
            .description{
                    height: 47px;
                }
            button{
                position: absolute;
                right: 15px;
                bottom: 8px;
                height: 22px;
                margin-top: 5px;
                border-radius: 5px;
                border: none;
                width: 112px;
                background-color: #1877F2;
                color: #ffffff;
                font-weight: 700;
                font-family: 'Lato', sans-serif;
            }
        }
    }
    @media (min-width: 620px){
      width: 611px;
      height: 209px;
      border-radius: 16px;
      padding: 25px;
      flex-direction: row;
      align-items: baseline;
      .image{
        display: inline;
        border: 1px solid #000000;
        border-radius: 100px;
        background-color: #000000;
        width: 50px;
        height: 50px;
        margin-right: 16px;
      }
      div{
        align-items: baseline;
        p{
            font-size: 20px;
        }
        form{
            input{
                width: 502px;
            }
            .description{
                height: 66px;
            }
            button{
                height: 31px;
                right: 25px;
                bottom: 15px; 
            }
        }
      }
    }
`

