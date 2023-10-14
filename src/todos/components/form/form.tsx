import React, { useContext } from "react";
import "./form.css";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField/TextField";
import { Button } from "@mui/material";
import TodoHeader from "../todoHeader/todoHeader";
import { TokenStorage, UserStorage } from "../../../App";
// import { registerUser } from "../../services/user.service";
import WithAuth from "../../../auth";
import { useSnackbar } from "notistack";
import { constants } from "../../../config/constants";

interface IFormInput {
  title: string;
  description: string;
  userId: string;
}

const Form = () => {
  const [userDetails] = useContext(UserStorage);
  const [token] = useContext(TokenStorage);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      description: "",
      userId: userDetails ? userDetails.toString() : "",
    },
  });
  const { enqueueSnackbar } = useSnackbar();
  // console.log(userDetails);

  const navigate = useNavigate();

  const formSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await axios.post(
        `${constants.BASE_URL}/todos/createTodo`,
        data
      );
      enqueueSnackbar("Created", {
        variant: 'success',
        autoHideDuration: 3000
      });
      console.log(response.data);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  if (token) {
    return (
      <>
        <TodoHeader />
        <div className="form_container">
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
  } else {
    navigate("/");
    return null;
  }
};
export default WithAuth(Form);
