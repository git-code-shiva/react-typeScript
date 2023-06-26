import React, { useContext } from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { TokenStorage } from "../../App";

const Header = () => {
  const [token, setToken] = useContext(TokenStorage);
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/landingPage");
  };
  const handleLogout = () => {
    setToken(null);
  };
  return (
    <>
      <div className="page_header">
        <button onClick={handleHome}>Home</button>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </>
  );
};
export default Header;
