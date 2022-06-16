import PageContainer from "./../components/PageContainer";
import CreatePost from "./../components/CreatePost";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Timeline() {
	const { token } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		if (!token) {
			navigate("/");
		}
	}, []);
	return (
		<>
			<PageContainer title={"timeline"}>
				<CreatePost />
			</PageContainer>
		</>
	);
}

export default Timeline;
