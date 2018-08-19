var socket = io();
socket.on("connect", () => {
  console.log("Connected to server");

  // socket.emit("createMessage", {
  //   from: "Sharif",
  //   text: "Hey I got your message"
  // });
});

socket.on("newMessage", message => {
  console.log("newMessage", message);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
