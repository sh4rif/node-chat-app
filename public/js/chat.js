var socket = io();

var scrollToBottom = () => {
  // var scrollTop = window.scrol
  // Selector
  var messages = $("#messages");
  var newMessage = messages.children("li:last-child");

  // height
  var clientHeight = messages.prop("clientHeight");
  var scrollTop = messages.prop("scrollTop");
  var scorllHeight = messages.prop("scrollHeight");
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (
    scrollTop + clientHeight + newMessageHeight + lastMessageHeight >=
    scorllHeight
  ) {
    console.log(newMessageHeight);
    messages.scrollTop(scorllHeight);
  } else {
  }
};

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("newMessage", message => {
  var formattedTime = moment(message.createdAt).format("h:mm:ss a");
  var template = $("#message-template").html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  $("#messages").append(html);
  scrollToBottom();
});

socket.on("newLocationMessage", message => {
  var formattedTime = moment(message.createdAt).format("h:mm a");
  var template = $("#location-message-template").html();
  var html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url: message.url
  });

  $("#messages").append(html);
  scrollToBottom();
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
