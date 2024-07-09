
class Sockets {
  constructor(io) {
    this.io = io;
    this.socketsEvents();
  }

  socketsEvents () {
    // ON connection
    this.io.on('connection', socket => {

      // Escuchar evento: mensaje-to-server
      socket.on('mensaje-to-server', (data) => {
        this.io.emit('mensaje-from-server', data)
      })

      // socket.emit('mensaje-bienvenida', {
      //   msg: 'Bienvenido al server',
      //   fecha: new Date()
      // })

      // socket.on("mensaje-cliente", data => {
      //   console.log(data)
      // });

      // socket.on('disconnect', () => { /* … */ });
    });
  }
}

module.exports = Sockets