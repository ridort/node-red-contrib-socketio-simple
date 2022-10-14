module.exports = (input, inputType, msg, RED) => {
  switch (inputType) {
    case "msg":
      return RED.util.getMessageProperty(msg, input);
    case "str":
      return input;
    case "num":
      return +input;
    case "json":
      return JSON.parse(input);
    default:
      throw "Not implemented";
  }
};
