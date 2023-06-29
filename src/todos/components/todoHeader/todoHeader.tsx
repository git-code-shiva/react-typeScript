import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TokenStorage } from "../../../App";
import "./todoHeader.css";
import HomeIcon from "@mui/icons-material/Home";
import { pink } from "@mui/material/colors";
import LogoutIcon from "@mui/icons-material/Logout";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

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
  const fabStyles = {
    backgroundColor: "#ef5350",
    color: "white",
    transition: "background-color 0.3s ease", // Add transition for smooth effect
  };
  const handleMouseEnter = (event: any) => {
    event.target.style.backgroundColor = "#ba110e"; // Change background color on hover
  };

  const handleMouseLeave = (event: any) => {
    event.target.style.backgroundColor = "#ef5350"; // Restore original background color
  };
  {
    if (token) {
      return (
        <>
          <div className="header_container">
            <div className="left_group">
              <Fab
                color="primary"
                size="medium"
                sx={{ marginRight: 1 }}
                onClick={gotoMain}
              >
                <HomeIcon
                // className="home"
                // sx={{ color: pink[500], fontSize: 40 }}
                />
              </Fab>
              <Fab
                color="primary"
                aria-label="add"
                size="medium"
                onClick={gotoForm}
              >
                <AddIcon />
              </Fab>
            </div>
            <Fab
              style={fabStyles}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              size="medium"
              className="logout"
              onClick={logout}
            >
              <LogoutIcon

              // sx={{ fontSize: 40 }}
              />
            </Fab>
          </div>
        </>
      );
    } else {
      navigate("/");
      return null;
    }
  }
};
export default TodoHeader;
