import React, { useContext } from "react";
import "./login.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { TokenStorage } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  email: string;
  password: string;
}

const Login = () => {
  const [token, setToken] = useContext(TokenStorage);
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
      <h3>Login</h3>
      <form onSubmit={handleSubmit(formSubmit)} className="login_form">
        <div className="login_container">
          <div className="login_label_container">
            <label htmlFor="email">Email:</label>
            <label htmlFor="password">Password:</label>
          </div>

          <div className="login_input_container">
            <input
              type="email"
              placeholder="Enter Your Email"
              {...register("email")}
            />
            <input
              type="password"
              placeholder="Enter Your Password"
              {...register("password")}
            />
          </div>
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};
export default Login;
