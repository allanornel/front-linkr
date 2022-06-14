import styled from 'styled-components';

function CreatePost(){
    return(
        <NewPost>
            <p>What are you going to share today?</p>
            <form>
                <input  placeholder="http://..." />
                <input className='description' placeholder="Awesome article about #javascript" />
                <button>Publish</button>
            </form>
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
    @media (min-width: 620px){
      width: 611px;
      height: 209px;
      border-radius: 16px;
      padding: 25px;
      align-items: baseline;
      p{
        font-size: 20px;
      }
      form{
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
`

