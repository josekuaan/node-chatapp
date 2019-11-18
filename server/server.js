const path = require("path");
const http = require("http")
const express = require("express")

const socketIO = require("socket.io")


const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app)

var io = socketIO(server)
 
 io.on("connection", (socket)=>{
   console.log("new user connected")


    //  socket.emit("newMessage",{
    //      from:"mike@exampl.gmail",
    //      text:"hey how far",
    //      createdAt:12334
    //  } ) // this will emit only to one user;

     socket.on("createMessage", (message)=>{
       console.log("createMessage", message)

       io.emit('newMessage', {
           from:message.from,
           text:message.text,
           createdAt: new Date().getTime()
       })// this emit event to every connected user
     })

   socket.on("disconnect", ()=>{
       console.log("client disconnected")
   })
 })

app.use(express.static(publicPath)) 

server.listen(port, ()=>{
    console.log("server up on port " + port )
})