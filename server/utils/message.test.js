const expect = require("expect");
const mocha = require("mocha");

const { generateMessage, generateLocationMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate correct message object", () => {
    var from = "Amjad";
    var text = "Testing Test";
    var message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe("number");
    // expect(message.from).toBe(from);
    // expect(message.text).toBe(text);
    expect(message).toMatchObject({ from, text });
  });
});

describe("generateLocationMessage", () => {
  it("should generate correct location object", () => {
    var from = "Sam";
    var locationObj = generateLocationMessage(from, 1, 1);
    expect(typeof locationObj.createdAt).toBe("number");
    expect(locationObj.url).toBe("https://www.google.com/maps?q=1,1");
  });
});
