import React, { useContext } from "react";
import "./form.css";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField/TextField";
import { Button } from "@mui/material";
import TodoHeader from "../todoHeader/todoHeader";
import { UserStorage } from "../../../App";
// import { registerUser } from "../../services/user.service";

interface IFormInput {
  title: string;
  description: string;
  userId: string;
}

const Form = () => {
  const [userDetails, setUserDetails] = useContext(UserStorage);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      description: "",
      userId: userDetails ? userDetails._id : "",
    },
  });
  const navigate = useNavigate();

  const formSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/todos/createTodo",
        data
      );
      console.log(response.data);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <TodoHeader />
      <div className="register_container">
        <form onSubmit={handleSubmit(formSubmit)} className="reg_form">
          <h3 style={{ fontFamily: "cursive" }}>Add Note</h3>
          <TextField
            id="fname"
            label="Title"
            variant="outlined"
            required
            {...register("title")}
          />
          <TextField
            id="lname"
            label="Description"
            variant="outlined"
            required
            {...register("description")}
          />
          <Button type="submit" variant="contained">
            Add
          </Button>
        </form>
      </div>
    </>
  );
};
export default Form;