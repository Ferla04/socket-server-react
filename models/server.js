// Servidor express
const express = require('express')
const http = require('http');
const socketIo = require('socket.io')
const path = require('path');
const cors = require('cors')

const Sockets = require('./sockets');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT ?? 8080;

    // Http server
    this.server = http.createServer(this.app)

    // Configuración de sockets io
    this.io = socketIo(this.server, {/* Configuraciones */ });
  }

  middlewares () {
    // Desplegar el directorio publico
    this.app.use(express.static(path.resolve(__dirname, '../public')))

    // CORS
    this.app.use(cors())
  }

  configSockets () {
    new Sockets(this.io)
  }

  execute () {
    this.middlewares()

    // Inicializar Sockets
    this.configSockets()

    // Inicializar Server
    this.server.listen(this.port, () => console.log('Servidor corriendo en puerto:', this.port));
  }
}

module.exports = Server