import styled from 'styled-components';

function PageTitle({ children }){
    return(
        <Title>
            { children }
        </Title>
    )
}

export default PageTitle;

const Title = styled.h2`
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 33px;
    color: #FFFFFF;
`