import React, { useContext, useEffect, useState } from "react";
import "./landingPage.css";
import { TokenStorage } from "../../App";
import { useNavigate } from "react-router-dom";
import Header from "../header/header";
import axios from "axios";

const LandingPage = () => {
  // interface Employee {
  //   firstName: string;
  //   lastName: string;
  //   email: string;
  //   designation: string;
  // }
  const [token, setToken] = useContext(TokenStorage);
  const [response, setResponse] = useState<any[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);

  useEffect(() => {
    const getAllData = async () => {
      const result = await axios.get("http://localhost:5000/employee");
      setResponse(result.data);
    };
    getAllData();
  }, []);

  useEffect(() => {
    console.log(response);
  }, [response]);
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are u sure u want to delete?")) {
      await axios.delete(`http://localhost:5000/employee/${id}`);
      setResponse((prevPost) => prevPost.filter((post) => post._id !== id));
    }
  };

  const handleEdit = (employee: any) => {
    setSelectedEmployee(employee);
  };

  const handleSaveEdit = () => {
    setSelectedEmployee(null);
  };

  const handleCancelEdit = () => {
    setSelectedEmployee(null);
  };

  return (
    <>
      {token ? (
        <>
          <Header />
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Designation</th>
              </tr>
            </thead>
            <tbody>
              {response.map((val, i) => (
                <tr key={i}>
                  <td>{val.firstName}</td>
                  <td>{val.lastName}</td>
                  <td>{val.email}</td>
                  <td>{val.designation}</td>
                  {selectedEmployee === val ? (
                    <>
                      <button onClick={handleSaveEdit}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(val)}>Edit</button>
                      <button onClick={() => handleDelete(val._id)}>
                        Delete
                      </button>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        navigate("/")
      )}
    </>
  );
};
export default LandingPage;
