import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/connectdb.js';
import { notFound, errorHandler } from "./middileware/errorMiddileware.js";

import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config({ path: './config.env' })

export const app = express()

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
app.use(express.json())
app.use(cors())
console.log(process.env.SECRET_KEY)
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || '8001'
const DATABASE_URL = process.env.DATABASE_URL|| "mongodb://localhost:27017"
//   'mongodb+srv://glad:lookman17@glad.dkowsha.mongodb.net/?retryWrites=true&w=majority'
// mongodb+srv://pratham:lookman17@cluster1.vuxzs.mongodb.net/?retryWrites=true&w=majority
connectDB(DATABASE_URL)

app.use(notFound);
app.use(errorHandler);



const server = httpServer.listen(port, () => {
  console.log(`local host:${port}`)
})
io.listen(server)




// console.log(io, "io")
io.on("connection", (socket) => {
  // console.log("Connected to socket.io with id --> ", socket.id);
  socket.emit("connected");

  socket.on("sdp", (data) => {
    // socket.join(userId);
    // socket.join(room);
    console.log("User offered sdp: " + JSON.stringify(data.sdp));
    // console.log("User offered sdp: " + data.sdp);
    socket.broadcast.emit("serverOffer", data)
  });

  
  socket.on("candidate", (data) => {
    // socket.join(userId);
    // socket.join(room);
    // console.log("User cadidate : " + JSON.stringify(data));
    socket.broadcast.emit("serverCandidate", data)
  });
  



  socket.on("join chat", (room) => {
    // socket.join(userId);
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  
  socket.on("disconnect", (socket) => {
    console.log(socket.id,"offline disconnected" );
  })

}

)



