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
    node.inEvent = config.event;
    node.inEventType = config.eventType;
    node.inTarget = config.target;
    node.inTargetType = config.targetType;
    node.inData = config.data;
    node.inDataType = config.dataType;

    // *************************************************************************
    // Node logic
    // *************************************************************************
    // Called when a message is passed into the node
    const inputHandler = (msg, send, done) => {
      const io = node.inServer.io;

      const event = parseTypedInputs(node.inEvent, node.inEventType, msg, RED);
      const target = parseTypedInputs(node.inTarget, node.inTargetType, msg, RED);
      const data = parseTypedInputs(node.inData, node.inDataType, msg, RED);

      if (target) {
        // Emit to room or socket
        io.to(target).emit(event, data);
      } else {
        // Emit globally
        io.emit(event, data);
      }
    };

    // *************************************************************************
    // Listener management
    // *************************************************************************
    node.on("input", inputHandler);
  }

  RED.nodes.registerType("socket.io out", NodeFunction);
};
