import React, { useContext, useEffect, useState } from "react";
import TodoHeader from "../todoHeader/todoHeader";
import axios from "axios";
import Card from "../../card";
import { useNavigate } from "react-router-dom";
import { TokenStorage, UserStorage } from "../../../App";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import "./homePage.css";
import WithAuth from "../../../auth";
import { useSnackbar } from "notistack";

const HomePage = () => {
  const [post, setPost] = useState<any[]>([]);
  const [token] = useContext(TokenStorage);
  const [userDetails] = useContext(UserStorage);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [noteDeleteId, setNoteDeleteId] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const getData = async () => {
    const postResponse = await axios.get(
      `http://localhost:5000/todos/getTodo?userId=${userDetails}`
    );
    console.log(postResponse);
    setPost(postResponse.data);
    // const userResponse = await axios.get("http://localhost:5000/employee");
    // console.log(userResponse);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails) {
      getData();
    }
  }, [userDetails]);

  const handleDelete = async (id: any) => {
    // if (window.confirm("Are u sure want to delete this note")) {
    //   await axios.delete(`http://localhost:5000/todos/${id}`);
    //   setPost(post.filter((post) => post._id !== id));
    // }
    setDeleteDialogOpen(true)
    setNoteDeleteId(id)
  };

  const handleDeleteConfirmation = async () => {
    setDeleteDialogOpen(false); // Close the dialog

    try {
      await axios.delete(`http://localhost:5000/todos/${noteDeleteId}`);
      setPost(post.filter((post) => post._id !== noteDeleteId));
      enqueueSnackbar("Note deleted successfully", { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Error deleting note", { variant: "error" });
    }
  };

  const handleEdit = (id: any) => {
    navigate(`/editPage/${id}`);
  };

  {
    if (token) {
      return (
        <>
          <TodoHeader />
          <Box
            display="flex"
            flexWrap="wrap"
            sx={{ gap: 5 }}
            className="post_container"
          >
            <>
              {post
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((post: any, i: any) => {
                  return (
                    <Card
                      post={post}
                      key={i}
                      handleDelete={() => handleDelete(post._id)}
                      handleEdit={() => handleEdit(post._id)}
                    />
                  );
                })}
            </>
          </Box>
          <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this note?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmation} color="primary">
            Yes
          </Button>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
        </>
      );
    } else {
      navigate("/");
      return null;
    }
  }
};
export default WithAuth(HomePage);
