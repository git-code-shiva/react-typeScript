import React from "react";
import "./register.css";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    console.log(data);
    try {
      await axios.post("http://localhost:5000/employee/register", data);
      alert("Form Submit Sucessfully");
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className="register_container">
        <header>
          <h2>Registration</h2>
        </header>

        <form onSubmit={handleSubmit(formSubmit)} className="reg_form">
          <div className="reg_label_container">
            <label htmlFor="fname">First Name:</label>
            <label htmlFor="lname">Last Name:</label>
            <label htmlFor="email">Email:</label>
            <label htmlFor="designation">Designation:</label>
            <label htmlFor="password">Password:</label>
          </div>

          <div className="reg_inp_container">
            <input
              type="text"
              id="fname"
              placeholder="Enter Your First Name"
              {...register("firstName")}
            />
            <input
              type="text"
              id="lname"
              placeholder="Enter Your Last Name"
              {...register("lastName")}
            />
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              {...register("email")}
            />
            <input
              type="text"
              id="designation"
              placeholder="Enter Your Role"
              {...register("designation")}
            />
            <input
              type="password"
              id="password"
              placeholder="Choose Password"
              {...register("password")}
            />
            <button className="reg_btn" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Register;
