const moment = require("moment");

module.exports = {
  generateMessage: (from, text) => ({
    from,
    text,
    createdAt: moment().valueOf()
  }),

  generateLocationMessage: (from, lat, lan) => ({
    from,
    url: `https://www.google.com/maps?q=${lat},${lan}`,
    createdAt: moment().valueOf()
  })
};
