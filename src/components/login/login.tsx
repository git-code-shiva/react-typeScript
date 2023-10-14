import React, { useContext, useEffect } from "react";
import "./login.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { TokenStorage, UserStorage } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { enqueueSnackbar, useSnackbar } from "notistack";

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

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const user = localStorage.getItem("key");
    if (user) {
      navigate("/");
    }
  }, []);

  const formSubmit: SubmitHandler<IFormInput> = async (data) => {
    // console.log(data);
    try {
      const response = await axios
        .post("http://localhost:5000/employee/login", data)
        .then((res) => {
          if (res.data == "Wrong Credentials") {
            // alert("Wrong Credential");
            enqueueSnackbar("Wrong Credential", {
              variant: 'error',
              autoHideDuration: 3000
            });
            // navigate("/register");
          } else {
            localStorage.setItem("key", JSON.stringify(res.data.employee._id));
            localStorage.setItem("token", JSON.stringify(res.data.token));
            setUserDetails(JSON.parse(localStorage.getItem("key") || ""));
            setToken(JSON.parse(localStorage.getItem("token") || ""));
            // console.log(res.data);
            // console.log(userDetails);
            // console.log(typeof userDetails);
            enqueueSnackbar("Logging In", {
              variant: 'success',
              autoHideDuration: 3000
            });

            setTimeout(() => {
              navigate("/home");
            }, 1000);
            // navigate("/home");
          }
        });
      console.log(userDetails);

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
          <div className="newUser" style={{ marginTop: 8 }}>
            New User? <a href="/register">Register</a>
          </div>
        </form>
      </div>
    </>
  );
};
export default Login;
