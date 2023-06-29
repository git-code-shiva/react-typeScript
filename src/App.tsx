import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  useEffect,
} from "react";
// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/register/register";
import Login from "./components/login/login";
import HomePage from "./todos/components/homePage/homePage";
import EditForm from "./todos/components/editPage/editForm";
import Form from "./todos/components/form/form";
// import LandingPage from "./components/landingPage/landingPage";

export const TokenStorage = createContext<
  [string | null, Dispatch<SetStateAction<string | null>>]
>([null, () => {}]);

export const UserStorage = createContext<
  [{ _id: string } | null, Dispatch<SetStateAction<{ _id: string } | null>>]
>([null, () => {}]);

function App() {
  const [userDetails, setUserDetails] = useState<{ _id: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("key");
    const localStoreToken = localStorage.getItem("token");

    if (user && localStoreToken) {
      setUserDetails(JSON.parse(user));
      setToken(JSON.parse(localStoreToken));
    }
  }, [userDetails, token]);

  return (
    <div className="App">
      <UserStorage.Provider value={[userDetails, setUserDetails]}>
        <TokenStorage.Provider value={[token, setToken]}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="/landingPage" element={<LandingPage />} /> */}
              <Route path="/home" element={<HomePage />} />
              <Route path="/editPage/:id" element={<EditForm onClose />} />
              <Route path="/form" element={<Form />} />
            </Routes>
          </BrowserRouter>
        </TokenStorage.Provider>
      </UserStorage.Provider>
    </div>
  );
}

export default App;
