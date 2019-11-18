const path = require("path");
const http = require("http")
const express = require("express")

const socketIO = require("socket.io")

const {generateMessage} = require("./utils/message")

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app)

var io = socketIO(server)
 
 io.on("connection", (socket)=>{
   console.log("new user connected")

        // this will emit only to one user;
        socket.emit('newMessage',generateMessage('Admin','Welcome to the group'));

        // this emit event to every connected user but the user that join
        socket.broadcast.emit('newMessage',
        generateMessage('Admin','someone join using the group link'))

        socket.on('createMessage', (message)=>{
            // this emit event to every connected user
            io.emit('newMessage', generateMessage(message.from,message.text))

                //socket.broadcast.emit('newMessage', {
                //        from:message.from,
                //        text:message.text,
                //        createdAt: new Date().getTime()
                //    })
        })
       

       socket.on("disconnect", ()=>{
        console.log("client disconnected")
    })
 
     })


  

app.use(express.static(publicPath)) 

server.listen(port, ()=>{
    console.log("server up on port " + port )
})