// UNIX TIMESTAMP Jan 1st 1970 00:00:00 am
const moment = require("moment");

// var date = moment();
// console.log(date.format("MMM Do, YYYY"));
// var date = new Date();
// console.log(date.getMonth());

// var sometimestamp = moment().valueOf();

var date = moment();
console.log(date.valueOf());
console.log(date.format("h:mm a"));
