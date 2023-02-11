import React, { useRef,useState,useEffect } from 'react'
import { Button, Box } from "@mui/material";

const Room = () => {
    const inputRef = useRef()
const JoinRoom =()=>{
console.log('first',inputRef.current.value)
inputRef.current.value=''
}

  return (
    <div>
<Box>
<input ref={inputRef} placeholder='room Id'/>

</Box>

{/* <Box>
<input/>

</Box> */}


<Button onClick={JoinRoom} >
    Join Room
</Button>



    </div>
  )
}

export default Room