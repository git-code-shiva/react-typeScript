import React from "react";
import "./register.css";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField/TextField";
import { Button } from "@mui/material";
// import { registerUser } from "../../services/user.service";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  designation: string;
  password: string;
}

const Register = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      designation: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const formSubmit: SubmitHandler<IFormInput> = async (data) => {
    // console.log(data);
    // const res = await registerUser(data);

    const response = await axios.post(
      "http://localhost:5000/employee/register",
      data
    );
    try {
      const result = response.data.toString();
      // console.log(result);

      if (result.match("E11000 duplicate key error collection")) {
        console.log(result.data);
        alert("Email exist please Login");
        navigate("/");
      }
      // console.log(result.data);
      else {
        alert("Form Submit Sucessfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <>
      <div className="register_container">
        <form onSubmit={handleSubmit(formSubmit)} className="reg_form">
          <h3 style={{ fontFamily: "cursive" }}>Registration</h3>
          <TextField
            id="fname"
            label="First Name"
            variant="outlined"
            required
            {...register("firstName")}
          />
          <TextField
            id="lname"
            label="Last Name"
            variant="outlined"
            required
            {...register("lastName")}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            required
            {...register("email")}
          />
          <TextField
            id="designation"
            label="Designation"
            variant="outlined"
            required
            {...register("designation")}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            required
            type="password"
            {...register("password")}
          />
          <Button type="submit" variant="contained">
            Register
          </Button>
          <div className="alreadyUser">
            Already An User <a href="/">Sign In</a>{" "}
          </div>
        </form>
      </div>
    </>
  );
};
export default Register;
