import React, { useContext, useEffect, useState } from "react";
import "./landingPage.css";
import { TokenStorage } from "../../App";
import { useNavigate } from "react-router-dom";
import Header from "../header/header";
import axios from "axios";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { constants } from "../../config/constants";

const LandingPage = () => {
  const [token, setToken] = useContext(TokenStorage);
  const [response, setResponse] = useState<any[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);
  const [editedEmployee, setEditedEmployee] = useState<any | null>(null);

  useEffect(() => {
    const getAllData = async () => {
      const result = await axios.get(`${constants.BASE_URL}`);
      setResponse(result.data);
    };
    getAllData();
  }, []);

  useEffect(() => {
    console.log(response);
  }, [response]);

  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await axios.delete(`${constants.BASE_URL}/${id}`);
      setResponse((prevPosts) => prevPosts.filter((post) => post._id !== id));
    }
  };

  const handleEdit = (employee: any) => {
    setSelectedEmployee(employee);
    setEditedEmployee({ ...employee });
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `${constants.BASE_URL}/${selectedEmployee._id}`,
        editedEmployee
      );
      setSelectedEmployee(null);
      setResponse((prevPosts) =>
        prevPosts.map((post) =>
          post._id === selectedEmployee._id ? editedEmployee : post
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelEdit = () => {
    setSelectedEmployee(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedEmployee((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEmail = (event: any) => {
    switch (event.detail) {
      case 1: {
        console.log("Single Click");
        break;
      }
      case 2: {
        console.log("Double click");
        alert("You can not edit the Email");
        break;
      }
    }
  };

  return (
    <>
      {token ? (
        <>
          <Header />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    First Name
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    Last Name
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    Email
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    Designation
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {response
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .map((val, i) => (
                    <TableRow key={i}>
                      <TableCell align="center">
                        {selectedEmployee === val ? (
                          <TextField
                            name="firstName"
                            value={editedEmployee.firstName}
                            onChange={handleInputChange}
                          />
                        ) : (
                          val.firstName
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {selectedEmployee === val ? (
                          <TextField
                            name="lastName"
                            value={editedEmployee.lastName}
                            onChange={handleInputChange}
                          />
                        ) : (
                          val.lastName
                        )}
                      </TableCell>
                      <TableCell align="center" onClick={handleEmail}>
                        {val.email}
                      </TableCell>
                      <TableCell align="center">
                        {selectedEmployee === val ? (
                          <TextField
                            name="designation"
                            value={editedEmployee.designation}
                            onChange={handleInputChange}
                          />
                        ) : (
                          val.designation
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {selectedEmployee === val ? (
                          <>
                            <Button
                              variant="outlined"
                              size="medium"
                              onClick={handleSaveEdit}
                              style={{ marginRight: "5px" }}
                            >
                              Save
                            </Button>
                            <Button
                              variant="outlined"
                              size="medium"
                              onClick={handleCancelEdit}
                              style={{ marginRight: "5px" }}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              variant="outlined"
                              size="medium"
                              onClick={() => handleEdit(val)}
                              style={{ marginRight: "5px" }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => handleDelete(val._id)}
                              style={{ marginRight: "5px" }}
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        navigate("/")
      )}
    </>
  );
};

export default LandingPage;
