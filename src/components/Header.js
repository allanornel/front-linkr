import styled from 'styled-components';
import { useState } from 'react';

import { IoIosArrowDown } from 'react-icons/io';

function Header(){
    const [toggle, setToggle] = useState(false);

    return(
        <>
            <Container>
                <h1>linkr</h1>
                <div>
                    <IoIosArrowDown onClick={() => setToggle(!toggle)} color='#FFFFFF' size={18} strokeWidth="5"/>
                    <p>imagem</p>
                </div>
            </Container>
            { toggle ? (
                    <Bar>
                        <p>Logout</p>
                    </Bar>
                ) 
                : 
                <></>
            }
        </>
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

const Bar = styled.section`
    width: 150px;
    height: 43px;
    background-color: #171717;
    position: absolute;
    right: 0;
    border-radius: 0px 0px 0px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    p{
        font-size: 15px;
        font-weight: 700;
        color: #FFFFFF;
    }
`
