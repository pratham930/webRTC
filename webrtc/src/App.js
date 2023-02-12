import "./App.css";
import { Button, Box } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import { io } from "socket.io-client";

function App() {
  const [done, setDon] = useState(true);
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  // const localAudioRef = useRef()
  const pc = useRef(new RTCPeerConnection(null));
  const textRef = useRef();
  const candidates = useRef([]);

  // const [socket, setsocket] = useState(null)

  //   useEffect(() => {
  //     setsocket(io("http://localhost:8001"))
  //   }, []);

  const socket = io("http://192.168.29.12:8001/");

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log(socket.id, "id"); // x8WIv7-mJelg7on_ALbx
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("serverOffer", (offer) => {
        console.log(JSON.stringify(offer.sdp), "offer server"); // x8WIv7-mJelg7on_ALbx
        textRef.current.value = JSON.stringify(offer.sdp);

        if (offer.sdp.type === "answer") {
          setRemoteArea();
          socket.emit("callAccepted", "accepted");
          // addCandidate();
          // setDon(false);
        }
      });
    }
  }, [socket]);

  ///new wxperiment///////

  useEffect(() => {
    if (socket) {
      socket.on("servercallAccepted", (cadidate) => {
        if (cadidate) {
          addCandidate();
        }
      });
    }
  }, [socket]);
  ///new wxperiment///////

  useEffect(() => {
    if (socket) {
      socket.on("serverCandidate", (cadidate) => {
        console.log(cadidate, "cadidate"); // x8WIv7-mJelg7on_ALbx
        candidates.current = [...candidates.current, cadidate];
      });
    }
  }, [socket]);

  /////// ***** SOCKET End *****?/////
  useEffect(() => {
    const constrains = {
      audio: true,
      video: true,
    };
    navigator.mediaDevices
      .getUserMedia(constrains)
      .then((stream) => {
        localVideoRef.current.srcObject = stream;

        stream.getTracks().forEach((track) => {
          _pc.addTrack(track, stream);
        });

        // localAudioRef.current.srcObject = stream
      })
      .catch((e) => {
        console.log("first", e);
      });
  }, []);

  const _pc = new RTCPeerConnection(null);
  _pc.onicecandidate = (e) => {
    if (e.candidate) {
      socket.emit("candidate", e.candidate);
      // console.log(JSON.stringify(e.candidate),"121")
    }
  };

  _pc.oniceconnectionstatechange = (e) => {
    console.log(e, "oniceconnection");
  };

  _pc.ontrack = (e) => {
    console.log(e, "e");
    remoteVideoRef.current.srcObject = e.streams[0];
    /// we got remote stream
  };
  pc.current = _pc;

  const createOffer = () => {
    console.log(pc.current);

    pc.current
      .createOffer({
        offerToReceiveAudio: 1,
        offerToReceiveAudio: 1,
      })
      .then((sdp) => {
        // console.log(JSON.stringify(sdp),'client');
        pc.current.setLocalDescription(sdp);

        socket.emit("sdp", { sdp });
      })
      .catch((e) => console.log(e));
  };

  const createAnswer = () => {
    pc.current
      .createAnswer({
        offerToReceiveAudio: 1,
        offerToReceiveAudio: 1,
      })
      .then((sdp) => {
        console.log(JSON.stringify(sdp));
        pc.current.setLocalDescription(sdp);
        socket.emit("sdp", { sdp });
      })
      .catch((e) => console.log(e));
  };

  const setRemoteArea = () => {
    const sdp = JSON.parse(textRef.current.value);
    console.log(sdp);
    pc.current.setRemoteDescription(new RTCSessionDescription(sdp));

    if (sdp.type === "offer") {
      createAnswer();
      // setDon(false);
    }
  };

  const addCandidate = () => {
    // const candidate = JSON.parse(textRef.current.value);
    // pc.current.addIceCandidate(new RTCIceCandidate(candidate));

    candidates.current.forEach((candidate) => {
      console.log("Adding candidate", candidate);

      pc.current.addIceCandidate(new RTCIceCandidate(candidate));
    });
  };

  // const getUserMedia = ()=>{

  ////*** ASYNC AWAIT */

  // const getUserMedia = async()=>{
  // const constrains ={
  //   audio:true,
  //   video:true
  // }

  //   try {
  // const stream = await navigator.mediaDevices.getUserMedia(constrains)

  //     localVideoRef.current.srcObject = stream

  // } catch (error) {
  //   console.log("first",error)
  // }

  ////*** ASYNC AWAIT */

  ///******pROMIES8888*****/

  // const constrains ={
  //   audio:true,
  //   video:true
  // }

  //    navigator.mediaDevices.getUserMedia(constrains)
  // .then(stream=>{
  //   localVideoRef.current.srcObject = stream
  //   // localAudioRef.current.srcObject = stream
  // }).catch(e=>{ console.log("first",e)})

  return (
    <div className="App">
      {/* ///***TO START VIDEO MAUAL */}
      {/* <Button onClick={()=>getUserMedia()} variant="contained" >
click
    </Button> */}

      {/* ////8888***?? */}

      <Box sx={{ display: "flex", m: "10px" }}>
        <video
          style={{ width: 200, height: 240, backgroundColor: "black" }}
          ref={localVideoRef}
          autoPlay
        ></video>

        <video
          style={{
            width: 200,
            height: 240,
            backgroundColor: "black",
            marginLeft: "10px",
          }}
          ref={remoteVideoRef}
          autoPlay
        ></video>
      </Box>
      <Box>
        <Button onClick={createOffer} variant="contained">
          Call
        </Button>

        <Box>
          <textarea ref={textRef}></textarea>
        </Box>
        {/* <Button onClick={createAnswer} variant="contained">
          answer
        </Button> */}

        <Button onClick={setRemoteArea} variant="contained">
          accept call
        </Button>

        {/* <Button onClick={addCandidate} variant="contained">
          adding candidate
        </Button> */}
      </Box>
    </div>
  );
}

export default App;
