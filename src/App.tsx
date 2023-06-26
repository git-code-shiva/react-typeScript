import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
} from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/register/register";
import Login from "./components/login/login";
import LandingPage from "./components/landingPage/landingPage";

export const TokenStorage = createContext<
  [string | null, Dispatch<SetStateAction<string | null>>]
>([null, () => {}]);
function App() {
  const [token, setToken] = useState<string | null>(null);
  return (
    <div className="App">
      <TokenStorage.Provider value={[token, setToken]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/landingPage" element={<LandingPage />} />
          </Routes>
        </BrowserRouter>
      </TokenStorage.Provider>
    </div>
  );
}

export default App;
