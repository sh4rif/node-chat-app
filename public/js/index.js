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

socket.on("newLocationMessage", message => {
  var li = $("<li></li>");
  var a = $("<a target='_blank'>My current location</a>");
  // var link = `https://www.google.com/maps?q=${coords.latitude},${
  //   coords.longitude
  // }`;

  li.text(`${message.from}:`);
  a.attr("href", message.url);
  li.append(a);

  $("#messages").append(li);
});

$("#message-form").on("submit", event => {
  event.preventDefault();
  var message = $("[name=message]").val();
  var chatData = { from: "User", text: message };

  socket.emit("createMessage", chatData, data => {
    console.log(data);
  });
});

var locationButton = $("#send-location");

locationButton.on("click", () => {
  // console.log("clicked");
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser");
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    err => {
      alert("Unable to fetch location", err);
    }
  );
});
