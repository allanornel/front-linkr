import PageContainer from "./../components/PageContainer";
import CreatePost from "./../components/CreatePost";
import useAuth from "../hooks/useAuth";

function Timeline() {
	const { token } = useAuth();
	return (
		<>
			<PageContainer title={"timeline"}>
				<CreatePost />
			</PageContainer>
		</>
	);
}

export default Timeline;
