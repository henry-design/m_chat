import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";

function SetAvatar() {
  const api = "http://api.multiavatar.com/45678945/";
  const Navigate = useNavigate();
  const [avatar, setAvatar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select a Profile Picture", toastOptions);
      
    }
  };

  useEffect(() => {
    async function fetchData() {
      const data = [];
      for (let i = 0; i < 4; i++) {
        try {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );

          const buffer = new Buffer(image.data);
          data.push(buffer.toString("base64"));
        } catch (error) {
          console.log(error);
        }
      }
      setAvatar(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
    {
      isLoading ? 
        <Container>
          <img src={loader} alt="loader" className="loader" /> 
        </Container>
      : (
      
      <Container>
        <div className="title-container">
          <h1>Pick an Avatar as your Profile</h1>
        </div>
        <div className="avatars">
          {avatar.map((avatar, index) => {
            return (
              <div
                className={`avatar ${
                  selectedAvatar === index ? "selected" : ""
                }`}
                key={index}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  onClick={() => setSelectedAvatar(index)}
                  
                />
              </div>
            );
          })}
        </div>
        <button className="submit-btn" onClick={() => setProfilePicture()} >Set as Profile Picture</button>
      </Container>
       ) }
        <ToastContainer />
    </>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
    margin-bottom: 20px;
  }
  .avatars {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    .avatar {
      
      padding: 0.4rem;
      border: 0.4rem solid transparent;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.5s ease-in-out;
      
      img {
        height: 6rem;
        width: 6rem;
        border-radius: 50%;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
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
`;
export default SetAvatar;
