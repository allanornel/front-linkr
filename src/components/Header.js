import styled from "styled-components";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function Header(props) {
  const { signOut, image } = useAuth();
  const { toggle, setToggle } = props;
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    signOut();
  };

  return (
    <>
      <Container>
        <h1 onClick={() => navigate("/timeline")}>linkr</h1>
        <div onClick={() => setToggle(!toggle)}>
          {toggle ? <IoIosArrowUp color="#FFFFFF" size={18} strokeWidth="5" /> : <IoIosArrowDown color="#FFFFFF" size={18} strokeWidth="5" />}
          <img src={image} alt="userImage" />
        </div>
      </Container>
      {toggle ? (
        <Bar onClick={() => setToggle(false)}>
          <p onClick={() => handleLogout()}>Logout</p>
        </Bar>
      ) : (
        <></>
      )}
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
  h1 {
    color: #ffffff;
    font-family: "Passion One", cursive;
    font-size: 49px;
    font-weight: 700;
  }
  div {
    display: flex;
    align-items: center;
    img {
      width: 53px;
      height: 53px;
      margin-left: 16px;
      border-radius: 50px;
    }
  }
`;

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
  p {
    font-size: 15px;
    font-weight: 700;
    color: #ffffff;
  }
`;
