module.exports = {
  generateMessage: (from, text) => ({
    from,
    text,
    createdAt: new Date().getTime()
  }),

  generateLocationMessage: (from, lat, lan) => ({
    from,
    url: `https://www.google.com/maps?q=${lat},${lan}`,
    createdAt: new Date().getDate()
  })
};
