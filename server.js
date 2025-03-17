const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" } // Allow all origins
});

app.use(cors());
app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("draw", (data) => {
        socket.broadcast.emit("draw", data);
    });

    socket.on("clear", () => {
        io.emit("clear");
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
