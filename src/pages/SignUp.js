import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import requestAuthApi from "./../services/api/auth";

function SignUp() {
	const navigate = useNavigate();
	const [userSignUp, setSignUp] = useState({
		username: "",
		email: "",
		password: "",
		picture: "",
	});
	const [signUpStatus, setSignUpStatus] = useState(false);

	function handleInputs(e, property) {
		setSignUp({ ...userSignUp, [property]: e.target.value });
	}

	function handleSubmit(e) {
		e.preventDefault();
		setSignUpStatus(true);
		requestAuthApi
			.signUp(userSignUp)
			.then((response) => {
				alert("Cadastro Realizado");
				setSignUpStatus(false);
				navigate("/");
			})
			.catch((e) => {
				alert(e.response.data);
				console.log(e.response.data);
				setSignUpStatus(false);
			});
	}

	return (
		<>
			<Container>
				<Linkr>
					<h1>linkr</h1>
					<p>save, share and discover</p>
					<p>the best links on the web</p>
				</Linkr>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="e-mail"
						value={userSignUp.email}
						onChange={(e) => handleInputs(e, "email")}
						required
						disabled={signUpStatus}
					/>
					<input
						type="password"
						placeholder="password"
						value={userSignUp.password}
						onChange={(e) => handleInputs(e, "password")}
						autoComplete="on"
						required
						disabled={signUpStatus}
					/>
					<input
						type="text"
						placeholder="username"
						value={userSignUp.username}
						onChange={(e) => handleInputs(e, "username")}
						required
						disabled={signUpStatus}
					/>
					<input
						type="text"
						placeholder="picture url"
						value={userSignUp.picture}
						onChange={(e) => handleInputs(e, "picture")}
						required
						disabled={signUpStatus}
					/>
					<button disabled={signUpStatus}>Sign Up</button>
					<p onClick={() => navigate("/")}>Switch back to log in</p>
				</form>
			</Container>
		</>
	);
}

export default SignUp;

const Container = styled.div`
	display: flex;

	form {
		width: 40vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	input {
		width: 80%;
		height: 65px;
		background: #ffffff;
		border-radius: 6px;
		font-family: "Oswald";
		font-style: normal;
		font-weight: 700;
		font-size: 27px;
		line-height: 40px;
		color: #9f9f9f;
		padding-left: 10px;
		margin-bottom: 13px;
	}

	button {
		width: 80%;
		height: 65px;
		background: #1877f2;
		border-radius: 6px;
		font-family: "Oswald";
		font-style: normal;
		font-weight: 700;
		font-size: 27px;
		line-height: 40px;
		color: #ffffff;
		margin-bottom: 14px;
	}

	form p {
		font-family: "Lato";
		font-style: normal;
		font-weight: 400;
		font-size: 20px;
		line-height: 24px;
		text-decoration-line: underline;
		color: #ffffff;
	}

	@media only screen and (max-width: 800px) {
		display: flex;
		flex-direction: column;

		form {
			margin-top: 40px;
			width: 100%;
		}

		input {
			width: 330px;
			height: 55px;
		}

		button {
			width: 330px;
			height: 55px;
		}

		form p {
			font-size: 17px;
			line-height: 20px;
		}
	}
`;

const Linkr = styled.div`
	background-color: #151515;
	color: #ffffff;
	width: 60vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: left;
	padding-left: 144px;

	h1 {
		font-family: "Passion One";
		font-style: normal;
		font-weight: 700;
		font-size: 106px;
		line-height: 117px;
		letter-spacing: 0.05em;
	}

	p {
		font-family: "Oswald";
		font-style: normal;
		font-weight: 700;
		font-size: 43px;
		line-height: 64px;
		color: #ffffff;
	}

	@media only screen and (max-width: 800px) {
		justify-content: start;
		height: fit-content;
		width: 100vw;
		padding-left: 0;
		text-align: center;
		padding-bottom: 27px;
		h1 {
			font-size: 76px;
			margin-bottom: -25px;
		}
		p {
			font-size: 23px;
			line-height: 32px;
		}
	}
`;
