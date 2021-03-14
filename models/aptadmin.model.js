const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aptadminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    authkey: { type: String, required: true },
    type: { type: String, required: true },
  },

  { timestamps: true }
);

const Aptadmin = mongoose.model("aptadmin", aptadminSchema);

module.exports = Aptadmin;
