import React, { useRef, useState, useEffect } from "react";
import { io } from "socket.io-client";

const Socket = () => {

    const [socket, setsocket] = useState(null)

    useEffect(() => {
      setsocket(io("http://localhost:8001"))
    }, []);
  
    useEffect(() => {
  
      if (socket) {
        socket.on("connect", () => {
          console.log(socket.id, 'id'); // x8WIv7-mJelg7on_ALbx
        });
      }
  
    }, [socket])

  return (

    <div>Socket</div>
  )
}

export default Socket