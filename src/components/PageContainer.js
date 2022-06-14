import PageTitle from './PageTitle';

function PageContainer({ title, children }){
    return(
        <>
            <PageTitle>{ title }</PageTitle>
            <Container>
                { children }
            </Container>
        </>
    )
}

export default PageContainer;