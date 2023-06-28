import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TokenStorage } from "../../../App";
import "./todoHeader.css";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { pink } from "@mui/material/colors";
import LogoutIcon from "@mui/icons-material/Logout";

const TodoHeader = () => {
  const [token, settoken] = useContext(TokenStorage);
  const navigate = useNavigate();
  const gotoMain = () => {
    navigate("/home");
  };

  const gotoForm = () => {
    navigate("/form");
  };
  const logout = () => {
    localStorage.clear();
    settoken(null);
  };
  return (
    <>
      <div className="header_container">
        <div className="left_group">
          <HomeIcon
            className="home"
            sx={{ color: pink[500], fontSize: 40 }}
            onClick={gotoMain}
          />
          <AddCircleIcon
            className="add"
            sx={{ fontSize: 40 }}
            onClick={gotoForm}
          />
        </div>
        <LogoutIcon className="logout" onClick={logout} sx={{ fontSize: 40 }} />
      </div>
    </>
  );
};
export default TodoHeader;
