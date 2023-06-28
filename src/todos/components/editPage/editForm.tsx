import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField/TextField";
import { Button } from "@mui/material";
import TodoHeader from "../todoHeader/todoHeader";
import "./editForm.css";

const EditPage = ({ onClose }: { onClose: any }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/todos/${id}`)
      .then((response) => {
        console.log(response);

        setTitle(response.data.title);
        setDescription(response.data.description);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const updatedNote = { title, description };
    await axios
      .put(`http://localhost:5000/todos/${id}`, updatedNote)
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cancelEdit = () => {
    navigate("/home");
  };

  return (
    <>
      <TodoHeader />
      <div className="edit_container">
        <h2>Edit Note</h2>
        <form onSubmit={handleSubmit} className="edit_form">
          <div className="edit_page_inputs">
            <div>
              <TextField
                id="title"
                label="Title"
                variant="outlined"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="edit_input"
              />
            </div>
            <div>
              <TextField
                id="description"
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="edit_textarea"
              />
            </div>
          </div>

          <div className="btn_div">
            <Button type="submit" variant="contained" className="save_btn">
              Save
            </Button>
            <Button
              variant="contained"
              className="cancel_btn"
              onClick={cancelEdit}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditPage;
