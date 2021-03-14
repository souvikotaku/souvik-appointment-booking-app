const express = require("express");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bdbskjdjkbfksfuadufguGFUFJAJsdfsdfdfsdf'

let Aptadmin = require("../models/aptadmin.model");

//get the admins
router.get("/", async (req, res) => {
  try {
    const aptadmins = await Aptadmin.find();
    res.json(aptadmins);
  } catch (err) {
    res.json({ message: err });
  }
});

//register the admins

router.post("/add", async (req, res) => {
  const newAptadmin = new Aptadmin({
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
    authkey: req.body.authkey,
    type: "admin",
  });

  if (req.body.password.length < 6) {
    return res.json({
      status: "error",
      error: "Password too small. Should be atleast 6 characters",
    });
  }

  try {
    const savedAptadmin = await newAptadmin.save();
    res.json(savedAptadmin);
  } catch (error) {
    if (error.code === 11000) {
      // duplicate key
      return res.json({ status: "error", error: "Username already in use" });
    }
  }
});


//login the admins
router.post('/login', async (req, res) => {
	// const { username, password } = req.body

	const { email, password } = req.body
	const admin = await Aptadmin.findOne({ email }).lean()

	if (!admin) {
		return res.json({ status: 'error', error: 'Invalid email/password' })
	}
try{
    if ( await bcrypt.compare(password, admin.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: admin._id,
				email: admin.email
			},
			JWT_SECRET
		)

		return res.json({ 
      status: 'ok', 
      data: token,
      role: admin.type 
    })
	}else{
        res.json({ status: 'error', error: 'Invalid password' })
    }
}catch(error){
    res.json({ status: 'error', error: 'Invalid email/password' })

}
	

});

module.exports = router;
