import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserStorage } from "./App";

const WithAuth = (Component: any) => {
  const WithAuthComponent = (props: any) => {
    const [userDetails] = useContext(UserStorage);
    const navigate = useNavigate();

    useEffect(() => {
      if (!userDetails) {
        navigate("/");
      }
    }, [userDetails, navigate]);

    return userDetails ? <Component {...props} /> : null;
  };

  return WithAuthComponent;
};

export default WithAuth;
