import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo192.png";
import { ToastContainer, toast } from "react-toastify";
import"react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {registerRoute} from "../utils/APIRoutes"
function Register() {
  const Navigate=useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toastOptions ={
    position:"bottom-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark",
};
useEffect(()=>{
  if(localStorage.getItem("app-user")){
      Navigate("/")
  }
},[Navigate]);
  const handleSubmit =async (event) => {
    event.preventDefault();
    if(handleValidation()){
        console.log(`in validation${registerRoute}`)
        const { password,username, email } = values;
        const{data} = await axios.post(registerRoute,{ password, username, email})
        if(!data.status){
        toast.error(data.msg,toastOptions);}
        if(data.status){
        toast.success(data.msg,toastOptions);
        localStorage.setItem("app-user",JSON.stringify(data.user));
        Navigate("/")
      }


          

    }
    
  };
  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("password does not match confirmPassword!",toastOptions);
      return false;
    }
    else if(username.length<3||username.length>15 ){
        toast.error("username must be between 3 and 15 characters",toastOptions);
   return false;
    }
    else if(password.length<8||password===email ){
        toast.error("password must be more than 8 characters and not too obvious",toastOptions);
    return false;
    }else if (username.length < 3 || username.length > 15) {
        toast.error("username must be between 3 and 15 characters", toastOptions);
        return false;
      } else if (email === "") {
        toast.error("email is required", toastOptions);
        return false;
      }
      return true;
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="" />
            <h1>GOSOFT</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(event) => handleChange(event)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(event) => handleChange(event)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(event) => handleChange(event)}
          />
          <input
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            onChange={(event) => handleChange(event)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
  }
  img {
    height: 5rem;
  }
  h1 {
    color: white;
    text-transform: uppercase;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    padding: 2rem 4rem;
    border-radius: 2rem;
    input {
      color: white;
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      border-radius: 0.6rem;
      cursor: pointer;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        font-weight: bold;

        text-decoration: none;
      }
    }
  }
`;
export default Register;
