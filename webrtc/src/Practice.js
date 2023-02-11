import React, { useRef } from 'react'
import { Button, Box } from "@mui/material";


const Practice = () => {

    const posts = useRef([]);

    const ram = [{candidate:"ram"},
    {candidate:"shyam"},
    {candidate:"kam"}
]

const submit =()=>{
    console.log("first")
    posts.current = [...posts.current, ram] 
}

console.log(posts,"post")

  return (
    <div>

<Button onClick={submit}>
    click
</Button>

    </div>
  )
}

export default Practice