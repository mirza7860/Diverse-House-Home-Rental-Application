import React from "react";
import "../../styles/Login.scss";
import { useState } from "react";
import { setLogin } from "../../redux/state.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Loginpage = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      //  get data from server
      const loggedIn = await response.json();

      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
      }
      navigate("/");
    } catch (error) {
      console.log("Login Failed", error.message);
    }
  };
  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <a href="/register">Donot havean account ? Sign In Here</a>
      </div>
    </div>
  );
};
export default Loginpage;
