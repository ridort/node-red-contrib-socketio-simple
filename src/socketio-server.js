const socketio = require("socket.io");
const wildcard = require("socketio-wildcard");

module.exports = function (RED) {
  function NodeFunction(config) {
    // *************************************************************************
    // Boilerplate
    // *************************************************************************
    RED.nodes.createNode(this, config);
    const node = this;

    // *************************************************************************
    // Setup
    // *************************************************************************
    node.inPort = config.port;
    node.inCorsOrigin = config.corsOrigin || undefined;
    node.inCorsMethods = config.corsMethods || undefined;
    node.inCorsAllowedHeaders = config.corsAllowedHeaders || undefined;
    node.inCorsCredentials = config.corsCredentials || undefined;

    if (node.inCorsMethods) {
      node.inCorsMethods = node.inCorsMethods.split(",");
    }

    if (node.inCorsAllowedHeaders) {
      node.inCorsAllowedHeaders = node.inCorsAllowedHeaders.split(",");
    }

    // *************************************************************************
    // Create server
    // *************************************************************************
    // TODO: Implement CORS config
    const io = new socketio.Server({ cors: {} });
    io.use(wildcard());
    node.io = io;

    // *************************************************************************
    // Set up sockets
    // *************************************************************************
    io.on("connection", (socket) => {
      const socketId = socket.id;

      node.log(`${socketId} connected`);

      socket.on("*", (packet) => {
        const [event, payload] = packet.data;
        node.emit(`sio_event__${event}`, { event, payload, socketId });
      });

      socket.on("disconnect", () => {
        node.log(`${socketId} disconnected`);
      });
    });

    // *************************************************************************
    // Handle disconnect
    // *************************************************************************
    node.on("close", function () {
      node.log("Closing");
      io.close();
    });

    // *************************************************************************
    // Start server
    // *************************************************************************
    io.listen(node.inPort);
    node.log(`Server listening on port ${node.inPort}`);
  }
  RED.nodes.registerType("socket.io server", NodeFunction);
};
