// server.js
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const bodypaser = require('body-parser');
const socket_handler = require('./controller/socket_handler');

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
}));

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

const PORT = process.env.PORT || 4000;


app.get('/', (req, res) => {
    res.send('Socket.IO Server is running!');
});
app.use(bodypaser.json());
app.use('/api', require('./routes'));


io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket_handler(socket, io);
   
    // let currentRoom = null;

   
});


server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
