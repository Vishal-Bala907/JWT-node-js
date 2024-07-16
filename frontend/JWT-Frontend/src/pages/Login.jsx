import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const loginUser = async (event) => {
    event.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });

      // alert(data.error);
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Login successfull");
        navigate("/db");
      }
    } catch (error) {
      toast.error(data.error);
    }
  };
  return (
    <div>
      <form action="" onSubmit={loginUser}>
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
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
