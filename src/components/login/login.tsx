import React, { useContext } from "react";
import "./login.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { TokenStorage, UserStorage } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

interface IFormInput {
  email: string;
  password: string;
}

const Login = () => {
  const [token, setToken] = useContext(TokenStorage);
  const [userDetails, setUserDetails] = useContext(UserStorage);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const formSubmit: SubmitHandler<IFormInput> = async (data) => {
    // console.log(data);
    try {
      const response = await axios
        .post("http://localhost:5000/employee/login", data)
        .then((res) => {
          if (res.data == "Wrong Credentials") {
            alert("Wrong Credential");
            navigate("/register");
          } else {
            setToken(res.data.token);
            setUserDetails(res.data.employee);
            // console.log(res.data);
            console.log(userDetails);
            navigate("/home");
          }
        });

      // alert("Login Sucessfull");
      // navigate("/landingPage");
    } catch (error) {
      console.log(error);

      alert(error);
      navigate("/register");
    }
  };
  return (
    <>
      <div className="login_container">
        <form onSubmit={handleSubmit(formSubmit)} className="login_form">
          <h3 style={{ fontFamily: "cursive" }}>Login</h3>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            {...register("email")}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            {...register("password")}
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </form>
      </div>
    </>
  );
};
export default Login;
