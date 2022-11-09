# node-red-contrib-socketio-simple

This project is a collection of [Socket.IO](https://socket.io/) nodes for [Node-RED](https://nodered.org/).

The goal is to provide basic Socket.IO integration for Node-RED projects, including:
- Emitting events to Socket.IO clients
- Receiving events from Socket.IO clients
- Facilitating the joining and leaving of rooms
- Maybe more in future...

## Installation

Find and install via the Node-RED palette settings.

![image](https://user-images.githubusercontent.com/45545311/200959095-12612c12-3e50-49e9-9472-99d47da754a5.png)

## Usage


### socket.io in
The socket.io in node triggers its output when it receives a message from the client of a specified type.

Inputs:
- `server (config node)` The Socket.IO server to listen to
- `listenEvent (string)` The event to listen for

Outputs:
```
{
  socketId: string, // The socket ID of the client
  event: string, // The name of the received event
  payload: any, // The payload (e.g., JSON) sent from the client
}
```



### socket.io out
The socket.io out node broadcasts (emits) a message to all connected clients, or a specified client or room.

- `server (config node)` The Socket.IO server to broadcast from
- `broadcastEvent (string or msg.path)` The event name of the broadcast
- `broadcastTarget (string or msg.path)` The target of the broadcast, i.e., all clients (if left blank), a particular client (using the client's socket ID), or a particular room (using the room name)
- `broadcastData (string, number, JSON, or msg.path)` The data payload to be broadcast

Outputs:
- None



### socket.io join
The socket.io join node provides the means for the server to add a client to a room.
- `server (config node)` The Socket.IO server to handle the request
- `room (string or msg.path)` The name of the room to join
- `target (string or msg.path)` The socket ID of the client

Outputs:
- The original input msg is sent forward



### socket.io leave
The socket.io join node provides the means for the server to remove a client from a room.
- `server (config node)` The Socket.IO server to handle the request
- `room (string or msg.path)` The name of the room to leave
- `target (string or msg.path)` The socket ID of the client

Outputs:
- The original input msg is sent forward
