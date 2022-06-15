import styled from 'styled-components';

import { IoIosArrowDown } from 'react-icons/io';

function Header(){
    return(
        <Container>
            <h1>linkr</h1>
            <div>
                <IoIosArrowDown color='#FFFFFF' size={18} strokeWidth="5"/>
                <p>imagem</p>
            </div>
        </Container>
    );
}

export default Header;

const Container = styled.header`
    padding: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 72px;
    background-color: #151515;
    h1{
        color: #FFFFFF;
        font-family: 'Passion One', cursive;
        font-size: 49px;
        font-weight: 700;
    }
    div{
        display: flex;
        p{
            color: #FFFFFF;
            margin-left: 16px;
        }
    }
`