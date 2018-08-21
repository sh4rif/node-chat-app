var socket = io();

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("newMessage", message => {
  var formattedTime = moment(message.createdAt).format("h:mm:ss a");
  var li = $("<li></li>");
  li.text(`${message.from} (${formattedTime}): ${message.text}`);

  $("#messages").append(li);
});

socket.on("newLocationMessage", message => {
  var li = $("<li></li>");
  var a = $("<a target='_blank'>My current location</a>");
  var formattedTime = moment(message.createdAt).format("h:mm a");

  li.text(`${message.from} ${formattedTime}:`);
  a.attr("href", message.url);
  li.append(a);

  $("#messages").append(li);
});

$("#message-form").on("submit", event => {
  event.preventDefault();
  var messageTextbox = $("[name=message]");
  var chatData = { from: "User", text: messageTextbox.val() };

  socket.emit("createMessage", chatData, () => {
    messageTextbox.val("");
  });
});

var locationButton = $("#send-location");

locationButton.on("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser");
  }

  locationButton.attr("disabled", true);
  locationButton.text("Sending Location...");

  navigator.geolocation.getCurrentPosition(
    position => {
      locationButton.removeAttr("disabled");
      locationButton.text("Send Location");
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    err => {
      locationButton.removeAttr("disabled");
      locationButton.text("Send Location");
      alert("Unable to fetch location", err);
    }
  );
});
