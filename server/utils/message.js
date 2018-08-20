module.exports = {
  generateMessage: (from, text) => ({
    from,
    text,
    createdAt: new Date().getTime()
  })
};
