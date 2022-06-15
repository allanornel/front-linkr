import styled from 'styled-components';

export default function Post(props) {
    const { user } = props;

    return (
        <PostContainer>
            <p className='image'></p>
            <Likes>
                <ion-icon name="heart-outline"></ion-icon>
                <span>10 likes</span>
            </Likes>
            <div>
                <p>username</p>
                <h1>testando texto do post <span>#hashtag</span></h1>
                <div className='link'>
                    <div className='text'>
                        <p>Como aplicar material UI em um projeto React</p>
                        <h1>Hey! I have moved this tutorial to my personal blog. 
                            Same content, new location. Sorry about making you click through to another page.</h1>
                        <a target="_blank" rel="noopener noreferrer" href="https://hub.driven.com.br/">Hub Driven</a>
                    </div>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png'/>
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

    .image{
        display: inline;
        border: 1px solid #000000;
        border-radius: 100px;
        background-color: #000000;
        width: 50px;
        height: 50px;
        margin-right: 16px;
        padding: 20px;
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

    ion-icon{
        margin-left: 6px;
    }

    span {
        font-size: 11px;
        margin-top: 8px;
    }
`