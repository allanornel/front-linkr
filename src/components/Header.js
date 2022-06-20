import styled from "styled-components";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoMdSearch } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { DebounceInput } from "react-debounce-input";
import { useState, useEffect } from "react";
import requestPostsApi from "./../services/api/posts";

function Header(props) {
  const { signOut, image } = useAuth();
  const { toggle, setToggle, close, setClose } = props;
  const navigate = useNavigate();
  const { token } = useAuth();
  const [search, setSearch] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const handleLogout = () => {
    navigate("/");
    signOut();
  };

  useEffect(() => {
        const promise = requestPostsApi.getAllUsers(token);
        promise.then((response) => {
          setAllUsers(response.data);
        });
        promise.catch((error) => {
          console.log(error.message);
        });
  }, [search]);

  async function handleSearch(e) {
    const { value } = e.target;
    if(!value) return setClose(true);
    setClose(false);
    setSearch(allUsers.filter((user) => user.username.includes(value)));
  }

  return (
    <>
      <Container>
        <h1 onClick={() => navigate("/timeline")}>linkr</h1>
        <SearchBar>
            <DebounceInput
              className="debounce-input" 
              debounceTimeout={300}
              min="3"
              placeholder="Search for people"
              onChange={(event) => handleSearch(event)}
            />
            <SearchedUsers close={close}>
              {search.map((user) => {
                return (
                  <Link to={`/user/${user.id}`} key={search.indexOf(user)} className='link-user'>
                    <li>
                      <img src={user.picture} />
                      <span>
                        {user.username}
                      </span>
                    </li>
                  </Link>
                );
              })}
            </SearchedUsers>
            <IoMdSearch className='search-icon'/>
          </SearchBar>
        <div onClick={() => setToggle(!toggle)}>
          {toggle ? <IoIosArrowUp color="#FFFFFF" size={18} strokeWidth="5" /> : <IoIosArrowDown color="#FFFFFF" size={18} strokeWidth="5" />}
          <img src={image} alt="userImage" />
        </div>
        {toggle ? (
          <Bar onClick={() => setToggle(false)}>
            <p onClick={() => handleLogout()}>Logout</p>
          </Bar>
          ) : (
          <></>
        )}
      </Container>
    </>
  );
}

export default Header;

const Container = styled.header`
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  padding: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 72px;
  background-color: #151515;
  z-index: 2;
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

const SearchBar = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 30%;

  .debounce-input {
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 9px;
    font-family: Lato;
    font-size: 19px;
    font-weight: 400;
    color: #515151;
    z-index: 3;
  }

  .search-icon {
    position: absolute;
    right: 10px;
    font-size: 30px;
    color: #c6c6c6;
    z-index: 3;
  }
`

const SearchedUsers = styled.ul`
  background-color: #e7e7e7;
  position: absolute;
  border-radius: 0 0 9px 9px;
  padding: 5px;
  padding-top: 15px;
  left: 0;
  right: 0;
  top: 30px;
  z-index: 2;
  display: ${props => props.close ? 'none' : 'inline'};
  
  .link-user {
    text-decoration: none;
  }

  li {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
  }

  span {
    margin-left: 5px;
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #515151;
  }
`;

const Bar = styled.section`
  position: fixed;
  right:0;
  top: 72px;
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

