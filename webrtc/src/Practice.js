import React, { useRef,useEffect,useState} from 'react'
import { Button, Box } from "@mui/material";
import { styled } from '@mui/material/styles';


const Practice = () => {

    const posts = useRef([]);
    const count = useRef(0);
    const [numb, setnumb] = useState(0)
    const [attachment, setaddAttachment] = useState()
    const [Nesattachment, setNewaddAttachment] = useState()


//     const array = []
    
// if (attachment) {
//   console.log(attachment)
//   const data = new FormData()
//   console.log(attachment.length)
// for (let index = 0; index < attachment.length; index++) {
//   // console.log(attachment[index],"54441")
//   data.append('addAttachment', attachment[index])
//   array.push(data.get("addAttachment"))
// }
//   console.log(data.get("addAttachment"),"addAttachment")
  
// }
   

// console.log(array)

    const ram = [
      {candidate:"ram"},
    {candidate:"shyam"},
    {candidate:"kam"}
]

const submit =(name)=>{
    console.log("first",name)
    posts.current = [...posts.current, name] 
    count.current =count.current+1
    // console.log(posts,"post")
    setnumb(numb+1)
    
}


useEffect(() => {

  console.log(posts,"post")
  console.log(count.current,"count")
  console.log(numb,"numb")

}, [numb])




  return (
    <div>
{ram.map((e,index)=>{
return(<Button key={index}
 onClick={()=>submit(e.candidate)}>
    {e.candidate}
</Button>
)})}

{posts.current.map(({candidate},index)=>{
    return(
      <Box key={index}>
        {candidate}
      </Box>
    )})}

{/* 
<input style={{backgroundColor:"blue"}} accept="doc/*"
 multiple
  id="profile-photo" type="file" onChange={(e) => { setaddAttachment(e.target.files) }} /> */}
    </div>
  )
}

export default Practice