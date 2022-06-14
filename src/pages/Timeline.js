import PageContainer from './../components/PageContainer';
import CreatePost from './../components/CreatePost';

function Timeline() {
  return (
    <>
      <PageContainer title={"timeline"}>
        <CreatePost />
      </PageContainer>
    </>
  );
}

export default Timeline;
