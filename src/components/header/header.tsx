import React, { useContext } from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { TokenStorage } from "../../App";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
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
        <HomeIcon
          className="home_icon"
          sx={{ fontSize: 40 }}
          onClick={handleHome}
          style={{ cursor: "pointer" }}
        />
        <LogoutIcon
          sx={{ fontSize: 40 }}
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        />
      </div>
    </>
  );
};
export default Header;
