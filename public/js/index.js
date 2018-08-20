var socket = io();
socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("newMessage", message => {
  console.log("newMessage", message);
  var li = $("<li></li>");
  li.text(`${message.from}: ${message.text}`);

  $("#messages").append(li);
});

socket.on("newMessage", message => {
  console.log("newMessage", message);
});

$("#message-form").on("submit", event => {
  event.preventDefault();
  var message = $("[name=message]").val();
  var chatData = { from: "User", text: message };

  socket.emit("createMessage", chatData, data => {
    console.log(data);
  });
});
