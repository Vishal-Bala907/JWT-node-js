import { useState } from "react";
import "./register.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const registerUser = async (event) => {
    event.preventDefault();
    const { username, email, password } = data;
    try {
      const { data } = await axios.post("/register", {
        username,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("registration successfull");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form action="" onSubmit={registerUser}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name=""
            id="username"
            placeholder="enter username..."
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input
            type="email"
            name=""
            id="email"
            placeholder="enter email..."
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name=""
            id="password"
            placeholder="enter password..."
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <div className="form-group">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}
