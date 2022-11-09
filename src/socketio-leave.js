const parseTypedInputs = require("./util/parseTypedInputs");

module.exports = function (RED) {
  function NodeFunction(config) {
    // *************************************************************************
    // Setup
    // *************************************************************************
    RED.nodes.createNode(this, config);
    const node = this;

    // Node inputs
    node.inServer = RED.nodes.getNode(config.server);
    node.inRoom = config.room;
    node.inRoomType = config.roomType;
    node.inTarget = config.target;
    node.inTargetType = config.targetType;

    // *************************************************************************
    // Node logic
    // *************************************************************************
    // Called when a message is passed into the node
    const inputHandler = (msg, send, done) => {
      const io = node.inServer.io;

      const room = parseTypedInputs(node.inRoom, node.inRoomType, msg, RED);
      const target = parseTypedInputs(node.inTarget, node.inTargetType, msg, RED);

      io.sockets.sockets.get(target).leave(room);

      node.send(msg);
    };

    // *************************************************************************
    // Listener management
    // *************************************************************************
    node.on("input", inputHandler);
  }

  RED.nodes.registerType("socket.io leave", NodeFunction);
};
