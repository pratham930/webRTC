import './App.css';
import {Button,Box} from '@mui/material';
import React,{useRef,useState,useEffect} from 'react';




function App() {

  const localVideoRef = useRef()
  // const localAudioRef = useRef()

  const getUserMedia =()=>{
const constrains ={
  audio:true,
  video:true
}
navigator.mediaDevices.getUserMedia(constrains)
.then(stream=>{
  localVideoRef.current.srcObject = stream
  // localAudioRef.current.srcObject = stream
}).catch(e=>{ console.log("first",e)})
  }

  return (
    <div className="App">
      
    <Button onClick={()=>getUserMedia()} variant="contained" >
click
    </Button>
    <Box>
<video ref={localVideoRef} autoPlay> </video>
{/* <audio ref={localAudioRef} autoPlay > </audio> */}


    </Box>
    
    </div>
  );
}

export default App;
