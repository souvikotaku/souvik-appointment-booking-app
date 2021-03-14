const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aptuserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
  },

  { timestamps: true }
);

const Aptuser = mongoose.model("aptuser", aptuserSchema);

module.exports = Aptuser;
