var socket = io();
socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("newMessage", message => {
  console.log("newMessage", message);
});

socket.on("newUserJoined", message => {
  console.log("newUserJoined", message);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
