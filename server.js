const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//mongo boilerplate
const uri = process.env.ATLAS_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.error(err);
  });

//routes
const aptuserRouter = require("./routes/aptuser");
app.use("/aptusers", aptuserRouter);

const aptadminRouter = require("./routes/aptadmin");
app.use("/aptadmins", aptadminRouter);

const userBookings = require("./routes/userbooking");
app.use("/userbookings", userBookings);

//test route
const userTests = require("./routes/usertest");
app.use("/usertests", userTests);

//heroku links
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5003;

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
