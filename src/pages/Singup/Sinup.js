import React, { useRef, useEffect, useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./styles.scss";
import customFetch from "../../utils/axios";
import anime from "animejs";
import { NavLink } from "react-router-dom";
import LoginButton from "../../components/LoginButton/LoginButton";

const Signup = () => {
  const [checkPaswword, setcheckPaswword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    id: "",
  });

  const handleSignup = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
      id: uuidv4(),
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const userAuth = {
      email: email,
      password: password,
    };
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("Please fill in all fields!");
    } else {
      customFetch.post("users", formData);
      customFetch.post("auth", userAuth);
      toast.success("User successfully created!");
      navigate("/");
    }
  };

  useEffect(() => {
    anime({
      targets: "h1",
      translateY: [
        { value: -50, duration: 500, easing: "easeOutQuad" },
        { value: 0, duration: 1200, easing: "easeOutBounce" },
      ],
      color: ["#fff", "#888"],
      duration: 18200,
    });
  }, []);
  const handleCheckPassword = () => {
    setcheckPaswword(!checkPaswword);
  };
  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="container-input">
          <div className="container-icons">
            <FaUser />
          </div>
          <input
            onChange={handleSignup}
            placeholder="Enter your name"
            type="text"
            id="username"
            value={formData.username}
          />
        </div>
        <div className="container-input">
          <div className="container-icons">
            <FaEnvelope />
          </div>
          <input
            onChange={handleSignup}
            placeholder="Enter your email"
            type="email"
            id="email"
            value={formData.email}
          />
        </div>
        <div className="container-input">
          <div className="container-icons">
            <FaLock />
          </div>
          <input
            onChange={handleSignup}
            placeholder="Enter your password"
            type={checkPaswword ? "text" : "password"}
            id="password"
          ></input>
          {checkPaswword ? (
            <FaEye className="password-icon" onClick={handleCheckPassword} />
          ) : (
            <FaEyeSlash
              className="password-icon"
              onClick={handleCheckPassword}
            />
          )}
        </div>
        <LoginButton type="submit" />
        <span>
          Already have an account?
          <NavLink style={{ textDecoration: "none" }} to="/">
            Login
          </NavLink>
        </span>
      </form>
    </div>
  );
};

export default Signup;
