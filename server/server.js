const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });
users = {}
io.on('connection',(socket)=>{
    socket.on('new-user',(user)=>{
        users[socket.id]=user
        socket.broadcast.emit('side-newuser-join', user);
        io.sockets.emit('active-list',users)
    })
    socket.on('disconnect',()=>{
        io.sockets.emit('active-list',users)
        socket.broadcast.emit('side-user-left',users[socket.id])
        delete users[socket.id]
    })

    socket.on('new-message',(user)=>{
      socket.broadcast.emit('message',user)
    })
})
