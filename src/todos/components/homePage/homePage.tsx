import React, { useContext, useEffect, useState } from "react";
import TodoHeader from "../todoHeader/todoHeader";
import axios from "axios";
import Card from "../../card";
import { useNavigate } from "react-router-dom";
import { TokenStorage, UserStorage } from "../../../App";
import { Box } from "@mui/material";
import "./homePage.css";
import WithAuth from "../../../auth";

const HomePage = () => {
  const [post, setPost] = useState<any[]>([]);
  const [token] = useContext(TokenStorage);
  const [userDetails] = useContext(UserStorage);

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
    if (window.confirm("Are u sure want to delete this note")) {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      setPost(post.filter((post) => post._id !== id));
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
        </>
      );
    } else {
      navigate("/");
      return null;
    }
  }
};
export default WithAuth(HomePage);
