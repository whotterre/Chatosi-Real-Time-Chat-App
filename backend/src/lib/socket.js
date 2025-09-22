// socket.js - QUICK FIX
import { Server } from "socket.io"
import http from "http"
import express from "express"

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors : {
        origin : ["http://localhost:5173"],
        methods: ["GET", "POST"]
    },
})

const userSocketMap = {} // ← ADD THIS LINE! It was missing!

export function getRecieverSocketId(userId){
    return userSocketMap[userId]
}

io.on("connection", (socket)=>{
    console.log("A user Connected", socket.id)

    const userId = socket.handshake.query.userId
    if(userId) {
        userSocketMap[userId] = socket.id // Now this works!
        console.log("User joined:", userId)
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap))
    
    socket.on("disconnect", ()=>{
        console.log("A user disconnected", socket.id)
        if (userId) {
            delete userSocketMap[userId]
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

export { io, app, server }