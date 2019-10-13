// var app = require('express')();
// var http = require('http').createServer(app);
// var io = require('socket.io')(http);

// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

// // io.on('connection', function(socket){
// //   socket.on('chat message', function(msg){
// //     io.emit('chat message', msg);
// //   });
// // });

// users = [];
// io.on('connection', function(socket) {
//    console.log('A user connected');
//    socket.on('setUsername', function(data) {
//       if(users.indexOf(data) > -1) {
//          users.push(data);
//          socket.emit('userSet', {username: data});
//       } else {
//          socket.emit('userExists', data + ' username is taken! Try some other username.');
//       }
//    });
//    socket.on('msg', function(data) {
//     //Send message to everyone
//     io.sockets.emit('newmsg', data);
//  })
// });

// // var nsp = io.of('/my-namespace');
// // nsp.on('connection', function(socket) {
// //    console.log('someone connected');
// //    nsp.emit('hi', 'Hello everyone!');
// // });

// // var roomno = 1;
// // io.on('connection', function(socket) {
   
// //    //Increase roomno 2 clients are present in a room.
// //    if(io.nsps['/'].adapter.rooms["room-"+roomno] && io.nsps['/'].adapter.rooms["room-"+roomno].length > 1) roomno++;
// //    socket.join("room-"+roomno);
// //    //Send this event to everyone in the room.
// //    io.sockets.in("room-"+roomno).emit('connectToRoom', "You are in room no. "+roomno);
// // })
// http.listen(3000, function () {
//   console.log('listening on *:3000');
// });

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
   res.sendfile('index.html');
});

users = [];
io.on('connection', function(socket) {
   console.log('A user connected');
   socket.on('setUsername', function(data) {
      console.log(data);
      if(users.indexOf(data) > -1) {
         socket.emit('userExists', data + ' username is taken! Try some other username.');
      } else {
         users.push(data);
         socket.emit('userSet', {username: data});
      }
   });
   
   socket.on('msg', function(data) {
      //Send message to everyone
      io.sockets.emit('newmsg', data);
   })
});

http.listen(3000, function() {
   console.log('listening on localhost:3000');
});