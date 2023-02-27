import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import style from "./style.scss";
import { NavLink } from "react-router-dom";
import anime from "animejs";
import { registerUser } from "../../features/userSllice";
import { useDispatch, useSelector } from "react-redux";
import LoginButton from "../../components/LoginButton/LoginButton";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkPaswword, setcheckPaswword] = useState(false);

  let isAuthenticated = false;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSignup = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Por favor preencha todos os campos!");
    } else {
      customFetch.get("auth").then((response) => {
        const authResponse = response.data;
        let isAuthenticated = false;

        authResponse.forEach((data) => {
          if (
            formData.email === data.email &&
            formData.password === data.password
          ) {
            isAuthenticated = true;
          }
        });

        if (isAuthenticated) {
          dispatch(registerUser(formData));
          navigate("/home");
          toast.success("User successfully authenticated!");
        } else {
          toast.warn("User not identified!");
        }
      });
    }
  };
  const ref = useRef(null);
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
      <h1>Login</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="container-input">
          {" "}
          <div className="container-icons">
            <FaEnvelope />
          </div>
          <input
            onChange={handleSignup}
            placeholder="enter the e-mail"
            type="email"
            id="email"
          ></input>
        </div>{" "}
        <div className="container-input">
          <div className="container-icons">
            <FaLock />
          </div>

          <input
            onChange={handleSignup}
            placeholder="enter the password"
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
          Don't have an account yet?
          <NavLink style={{ textDecoration: "none" }} to="/signup">
            Signup
          </NavLink>
        </span>
      </form>
    </div>
  );
};
export default Login;
