const mongoose = require("mongoose");

const connection = mongoose.connect(
   "mongodb+srv://hmahilange:mahilange@cluster0.m6psgpm.mongodb.net/mock12?retryWrites=true&w=majority"
);

module.exports = {
  connection,
};
