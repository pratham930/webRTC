import "./App.css";
import { Button, Box } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";

function App() {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  // const localAudioRef = useRef()
  const pc = useRef(new RTCPeerConnection(null));
  const textRef = useRef();

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

    const _pc = new RTCPeerConnection(null);

    _pc.onicecandidate = (e) => {
      console.log(JSON.stringify(e.candidate),"121")
      if (e.candiadate) console.log(JSON.stringify(e.candidate));
    };
    _pc.oniceconnectionstatechange = (e) => {
      console.log(e);
    };
    _pc.ontrack = (e) => {
      remoteVideoRef.current.srcObject = e.streams[0];
      /// we got remote stream
    };
    pc.current = _pc;
  }, []);

  const createOffer = () => {
    console.log(pc.current)
    
    pc.current
      .createOffer({
        offerToReceiveAudio: 1,
        offerToReceiveAudio: 1,
      })
      .then((sdp) => {
        console.log(JSON.stringify(sdp));
        pc.current.setLocalDescription(sdp);
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
      })
      .catch((e) => console.log(e));
  };

  const setRemoteArea = () => {
    const sdp = JSON.parse(textRef.current.value);
    console.log(sdp);
    pc.current.setRemoteDescription(new RTCSessionDescription(sdp));
  };
  const addCandidate = () => {
    const candidate = JSON.parse(textRef.current.value);
    console.log("Adding candidate", candidate);

    pc.current.addIceCandidate(new RTCSessionDescription(candidate));
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

  ///******pROMIES8888*****/

  // }

  return (
    <div className="App">
      {/* ///***TO START VIDEO MAUAL */}
      {/* <Button onClick={()=>getUserMedia()} variant="contained" >
click
    </Button> */}

      {/* ////8888***?? */}

      <Box>
        <video
          style={{ width: 200, height: 240, backgroundColor: "black" }}
          ref={localVideoRef}
          autoPlay
        >
          {" "}
        </video>
        <br />
        <video
          style={{ width: 200, height: 240, backgroundColor: "black" }}
          ref={remoteVideoRef}
          autoPlay
        >
          {" "}
        </video>
        {/* <audio ref={localAudioRef} autoPlay > </audio> */}
      </Box>
      <Box>
        <Button onClick={createOffer} variant="contained">
          offer
        </Button>

        <Box>
          <textarea ref={textRef}></textarea>
        </Box>
        <Button onClick={createAnswer} variant="contained">
          answer
        </Button>

        <Button onClick={setRemoteArea} variant="contained">
          setting remote
        </Button>

        <Button onClick={addCandidate} variant="contained">
          adding candidate
        </Button>
      </Box>
    </div>
  );
}

export default App;
