/*
the data structure is analyized here

*/
const mongoose = require("mongoose");

const signUpTemplate = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },

  id: { type: String },
  WalletData: [
    {
      title: {
        type: String,
      },
      amount: {
        type: String,
      },
      date: { type: String },
    },
  ],

  NoteData: [
    {
      content: { type: String },
      title: { type: String },
      date: { type: String },
    },
  ],
});
const siginUpSchem = mongoose.model("myTable", signUpTemplate);

module.exports = { siginUpSchem: siginUpSchem };
