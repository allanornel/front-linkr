import PageContainer from './../components/PageContainer';
import CreatePost from './../components/CreatePost';
import Post from './../components/Post';

function Timeline() {
  return (
    <>
      <PageContainer title={"timeline"}>
        <CreatePost />
        <Post />
      </PageContainer>
    </>
  );
}

export default Timeline;