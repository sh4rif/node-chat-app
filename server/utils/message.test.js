const expect = require("expect");
const mocha = require("mocha");

const { generateMessage } = require("./message");

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
