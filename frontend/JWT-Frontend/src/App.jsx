import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/useContext";

import axios from "axios";
import Dasshboard from "./pages/Dasshboard";
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = "true";

function App() {
  return (
    <UserContextProvider>
      <Navbar>Hello</Navbar>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
        }}
      />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/db" element={<Dasshboard />}></Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
