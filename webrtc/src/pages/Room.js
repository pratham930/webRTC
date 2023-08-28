import React, { useRef, useState, useEffect } from "react";
import { Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const Room = () => {
  const navigate = useNavigate();
  const inputRef = useRef();
  // const socket = io("http://192.168.29.12:8001/");
  const socket = io("http://localhost:8001");
  const JoinRoom = () => {
    console.log("first", inputRef.current.value);
    const roomId = inputRef.current.value;
    socket.emit("join chat", roomId);
    inputRef.current.value = "";

    navigate("/Room");
  };
  return (
    <div>
      <Box>
        <input ref={inputRef} placeholder="room Id" />
      </Box>

      {/* <Box>
<input/>

</Box> */}

      <Button onClick={JoinRoom}>Join Room</Button>
    </div>
  );
};

export default Room;
