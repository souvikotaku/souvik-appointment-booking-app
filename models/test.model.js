const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema(
  {
    name: { type: String, required: true},
    email: { type: String, required: true},
    
  },

  { timestamps: true }
);

const Usertest = mongoose.model("usertest", testSchema);

module.exports = Usertest;
