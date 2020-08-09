const socket = require('socket.io');
const io = socket();  
let users = []
let connections = []


 io
 .of('/spyfall/socket')
 .on('connection', socket => {
       connections.push(socket)
       console.log('Connected: %s sockets connected', connections.length);

     // Disconnect
     socket.on('disconnect', function(data){
        //users.splice(users.indexOf(socket.username), 1);
        //updateUsernames();
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s socket connected', connections.length)
    });

    socket.on('join', function (data) {
      console.log('joining room:', data);
      socket.join(data.gameCode)
    });

    socket.on('newPlayer', function (data) {
      console.log('new player:', data);
      socket.to(data.room).emit('newPlayer', {name: data.name} )
    });

    socket.on('updatePlayers', function (data) {
      console.log('updating players:', data);
      socket.to(data.room).emit('updatePlayers', {players: data.players} )
    });

    //test events
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
    console.log(data);
    });

  })

  module.exports = io;