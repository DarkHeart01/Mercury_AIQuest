import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./signin.css";
import user_icon from "@/images/person.png";
import email_icon from "@/images/email.png";
import password_icon from "@/images/password.png";

const LoginSignUp = () => {
  const [action, setAction] = useState("Sign Up");
  const [formData, setFormData] = useState({
    email: "",
    department: "",
    designation: "",
    password: "",
  });

  const navigate = useNavigate();

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  

  const handleSubmit = () => {
    if (action === "Login") {
      if (formData.email === "test@example.com" && formData.password === "password123") {
        alert("Login successful!");
        navigate("/dashboard"); 
      } else {
        alert("Invalid login credentials!");
      }
    } else {
      if (formData.email && formData.password && formData.department && formData.designation) {
        alert("Sign-up successful!");
        setAction("Login"); 
      } else {
        alert("Please fill in all fields for sign-up.");
      }
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Sign Up" && (
          <div className="input">
            <img src={email_icon} alt="email" />
            <input
              type="email"
              name="email"
              placeholder="Enter E-mail"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        )}
        <div className="input">
          <img src={user_icon} alt="department" />
          <input
            type="text"
            name="department"
            placeholder="Enter Department"
            value={formData.department}
            onChange={handleInputChange}
          />
        </div>
        <div className="input">
          <img src={user_icon} alt="designation" />
          <input
            type="text"
            name="designation"
            placeholder="Enter Designation"
            value={formData.designation}
            onChange={handleInputChange}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="password" />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {action === "Login" && (
        <div className="forgot-password">
          Lost Password? <span>Click Here!</span>
        </div>
      )}

      <div className="submit-container">
        <div className="submit" onClick={handleSubmit}>
          {action}
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => setAction("Sign Up")}
        >
          Sign Up
        </div>
        /*<div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => setAction("Login")}
        >
          Login
        </div>*/
      </div>
    </div>
  );
};

export default LoginSignUp;
