import { Button, Box } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";

const VideoCall = () => {

    const localVideoRef = useRef();
    const remoteVideoRef = useRef();
    const textRef = useRef(); 
    const pc = useRef(new RTCPeerConnection(null));

    useEffect(() => {
        const constrains ={
            audio:true,
            video:true
          }
        
             navigator.mediaDevices.getUserMedia(constrains)
          .then(stream=>{
            localVideoRef.current.srcObject = stream

            stream.getTracks().forEach(track=>{
                _pc.addTrack(track,stream)
            })
            // localAudioRef.current.srcObject = stream
          }).catch(e=>{ console.log("first",e)})


    }, [])


    const _pc = new RTCPeerConnection(null);
    
    _pc.onicecandidate =  (e) => {
if(e.candidate)
  console.log(JSON.stringify(e.candidate),"121")   
    };
    _pc.oniceconnectionstatechange = (e) => {
       console.log(e,"oniceconnection");
    };
    _pc.ontrack = (e) => {
      console.log(e,"e")

remoteVideoRef.current.srcObject = e.streams[0]

    };
    pc.current = _pc;



    const createOffer =()=>{
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

    }
     const createAnswer =()=>{
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
    }
    const setRemoteArea =()=>{
        const sdp = JSON.parse(textRef.current.value);
        pc.current.setRemoteDescription(new RTCSessionDescription(sdp));
        console.log(sdp)
    }
    const addCandidate =()=>{
        const candidate = JSON.parse(textRef.current.value);
        console.log('adding candidate:',candidate)
    pc.current.addIceCandidate(new RTCIceCandidate(candidate));

    }


  return (
    <div>

<Box sx={{display:"flex" ,m:'10px'}}>
<video
          style={{ width: 200, height: 240, backgroundColor: "black" }}
          ref={localVideoRef}
          autoPlay
        >
         
        </video>

        <video
          style={{ width: 200, height: 240, backgroundColor: "black" ,marginLeft:"10px" }}
          ref={remoteVideoRef}
          autoPlay
        >
        
        </video>
</Box>

<Box>
<Box>
          <textarea ref={textRef}></textarea>
        </Box>
</Box>


<Box>
        <Button onClick={createOffer} variant="contained">
          offer
        </Button>

       
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
  )
}

export default VideoCall